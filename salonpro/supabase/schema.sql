-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT UNIQUE,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'barber', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INT NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Barbers (barber-specific profile details)
CREATE TABLE public.barbers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  specialties TEXT[] DEFAULT '{}',
  commission_percent DECIMAL(5,2) DEFAULT 50.00,
  work_start TIME DEFAULT '09:00',
  work_end TIME DEFAULT '18:00',
  off_days TEXT[] DEFAULT ARRAY['Sunday']::TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Barber Service Assignments (many-to-many)
CREATE TABLE public.barber_services (
  barber_id UUID REFERENCES public.barbers(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  PRIMARY KEY (barber_id, service_id)
);

-- 5. Appointments
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  barber_id UUID REFERENCES public.barbers(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  amount DECIMAL(10,2),
  points_earned INT DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Loyalty Points
CREATE TABLE public.loyalty_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  points INT DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- 7. Loyalty Transactions (history)
CREATE TABLE public.loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  points_change INT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID UNIQUE REFERENCES public.appointments(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Offers/Coupons (Admin managed)
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_percent DECIMAL(5,2),
  flat_discount DECIMAL(10,2),
  max_uses INT,
  used_count INT DEFAULT 0,
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Notification Logs
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('sms', 'email', 'in_app')),
  message TEXT,
  sent_at TIMESTAMPTZ DEFAULT now(),
  read BOOLEAN DEFAULT false
);

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barber_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update only their own profile
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin can see all profiles
CREATE POLICY "Admin can read all profiles" ON public.profiles
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Services: Public read, admin insert/update/delete
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (active = true);

CREATE POLICY "Admin can manage services" ON public.services
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Barbers: Public read
CREATE POLICY "Public can view barbers" ON public.barbers
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage barbers" ON public.barbers
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Barber can update own record" ON public.barbers
  FOR UPDATE USING (profile_id = auth.uid());

-- Appointments
CREATE POLICY "Customer can view own appointments" ON public.appointments
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Customer can create own appointments" ON public.appointments
  FOR INSERT WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Barber can see own appointments" ON public.appointments
  FOR SELECT USING (barber_id IN (SELECT id FROM public.barbers WHERE profile_id = auth.uid()));

CREATE POLICY "Admin can manage all appointments" ON public.appointments
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Loyalty points
CREATE POLICY "User can read own loyalty points" ON public.loyalty_points
  FOR SELECT USING (profile_id = auth.uid());

-- Loyalty transactions
CREATE POLICY "User can read own transactions" ON public.loyalty_transactions
  FOR SELECT USING (profile_id = auth.uid());

-- Reviews
CREATE POLICY "Public can read reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Customer can create review for completed own appointment" ON public.reviews
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.appointments
      WHERE appointments.id = appointment_id
        AND appointments.customer_id = auth.uid()
        AND appointments.status = 'completed'
    )
  );

-- Coupons
CREATE POLICY "Users can see active coupons" ON public.coupons
  FOR SELECT USING (active = true AND (valid_until IS NULL OR valid_until > now()));

CREATE POLICY "Admin can manage coupons" ON public.coupons
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Notifications
CREATE POLICY "User can read own notifications" ON public.notifications
  FOR SELECT USING (profile_id = auth.uid());

-- ============================================================
-- Helper Functions
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url', 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
