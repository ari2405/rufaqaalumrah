-- ===== roles =====
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- shared updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ===== site settings =====
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage site settings" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== packages =====
CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Standard',
  nights integer NOT NULL DEFAULT 10,
  makkah_nights integer NOT NULL DEFAULT 5,
  madinah_nights integer NOT NULL DEFAULT 5,
  hotel_stars integer NOT NULL DEFAULT 4,
  price_from integer,
  price_note text NOT NULL DEFAULT 'Indicative starting price per person; confirmed in writing before booking.',
  departure_cities text[] NOT NULL DEFAULT '{}',
  months text[] NOT NULL DEFAULT '{}',
  image_url text,
  image_alt text,
  summary text NOT NULL DEFAULT '',
  highlights text[] NOT NULL DEFAULT '{}',
  inclusions text[] NOT NULL DEFAULT '{}',
  exclusions text[] NOT NULL DEFAULT '{}',
  itinerary jsonb NOT NULL DEFAULT '[]'::jsonb,
  hotels jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.packages TO authenticated;
GRANT ALL ON public.packages TO service_role;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published packages" ON public.packages FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Admins manage packages" ON public.packages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER packages_updated_at BEFORE UPDATE ON public.packages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== faqs =====
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Admins manage faqs" ON public.faqs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER faqs_updated_at BEFORE UPDATE ON public.faqs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== services =====
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'star',
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published services" ON public.services FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Admins manage services" ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== testimonials =====
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL DEFAULT '',
  quote text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== whatsapp templates =====
CREATE TABLE public.whatsapp_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  name text NOT NULL,
  purpose text NOT NULL DEFAULT '',
  body text NOT NULL,
  variables text[] NOT NULL DEFAULT '{}',
  provider_template_name text NOT NULL DEFAULT '',
  language_code text NOT NULL DEFAULT 'en',
  approval_status text NOT NULL DEFAULT 'not_submitted',
  approval_note text NOT NULL DEFAULT 'Not submitted to the WhatsApp Business provider yet. This template cannot be sent until the provider approves it.',
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT whatsapp_templates_status_check CHECK (approval_status IN ('not_submitted','submitted','approved','rejected'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_templates TO authenticated;
GRANT ALL ON public.whatsapp_templates TO service_role;
ALTER TABLE public.whatsapp_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage whatsapp templates" ON public.whatsapp_templates FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER whatsapp_templates_updated_at BEFORE UPDATE ON public.whatsapp_templates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== leads =====
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  departure_city text,
  travel_date text,
  pilgrims integer,
  duration text,
  package_type text,
  package_slug text,
  message text,
  source_form text NOT NULL DEFAULT 'contact',
  status text NOT NULL DEFAULT 'new',
  internal_notes text NOT NULL DEFAULT '',
  whatsapp_optin boolean NOT NULL DEFAULT false,
  consent_text text,
  consent_version text,
  consent_at timestamptz,
  whatsapp_status text NOT NULL DEFAULT 'not_applicable',
  whatsapp_template_key text,
  whatsapp_provider_message_id text,
  whatsapp_error text,
  whatsapp_last_attempt_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT leads_status_check CHECK (status IN ('new','contacted','quoted','booked','closed','lost')),
  CONSTRAINT leads_whatsapp_status_check CHECK (whatsapp_status IN ('not_applicable','pending','queued','sent','delivered','failed'))
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read leads" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update leads" ON public.leads FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER leads_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);

-- ===== starter WhatsApp templates (require provider approval before use) =====
INSERT INTO public.whatsapp_templates (key, name, purpose, body, variables, provider_template_name) VALUES
('enquiry_confirmation', 'Enquiry confirmation', 'Sent immediately after a new enquiry is received.',
 'Assalamu alaikum {{name}}, jazakAllah khair for your enquiry with Rufaqa Al Umrah. Summary — departure city: {{departure_city}}, travel date: {{travel_date}}, pilgrims: {{pilgrims}}, duration: {{duration}}, package type: {{package_type}}. You can view our available Umrah packages here: {{package_url}}. A companion from our team will reply shortly.',
 ARRAY['name','departure_city','travel_date','pilgrims','duration','package_type','package_url'], ''),
('package_availability_followup', 'Package availability follow-up', 'Sent when matching package availability is confirmed for the lead.',
 'Assalamu alaikum {{name}}, we have checked availability for a {{duration}} {{package_type}} Umrah from {{departure_city}}. Full details of the packages are here: {{package_url}}. Reply here if you would like a written quotation.',
 ARRAY['name','departure_city','duration','package_type','package_url'], ''),
('gentle_reminder', 'Gentle follow-up reminder', 'A single polite reminder if the lead has not replied.',
 'Assalamu alaikum {{name}}, just a gentle reminder about your Umrah enquiry from {{departure_city}} ({{duration}}, {{package_type}}). Our packages are listed here: {{package_url}}. Reply STOP at any time and we will not message you again.',
 ARRAY['name','departure_city','duration','package_type','package_url'], '');

-- ===== default site settings =====
INSERT INTO public.site_settings (key, value) VALUES
('business', jsonb_build_object(
  'brandArabic','رفقاء العمرة',
  'brandEnglish','RUFAQA AL UMRAH',
  'tagline','Your Trusted Companions for a Blessed Journey',
  'phoneDisplay','+91 86550 89608',
  'phoneDial','+918655089608',
  'whatsapp','918655089608',
  'email','salam@rufaqaalumrah.com',
  'addressLine','Mumbai, Maharashtra, India',
  'hours','Every day, 9:00 AM – 9:00 PM IST',
  'packagesUrl','/packages',
  'instagram','', 'facebook','', 'youtube','',
  'whatsappDefaultMessage','Assalamu alaikum Rufaqa Al Umrah, I would like to know more about your Umrah packages.'
));