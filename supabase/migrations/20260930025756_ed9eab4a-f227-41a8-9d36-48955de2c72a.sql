CREATE TABLE public.profiles (id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, display_name text, account_type text NOT NULL DEFAULT 'enterprise' CHECK (account_type IN ('enterprise','farmer')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.analyses (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, product_name text NOT NULL, input_mode text NOT NULL, inputs jsonb NOT NULL DEFAULT '{}'::jsonb, recommendation jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analyses TO authenticated;
GRANT ALL ON public.analyses TO service_role;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own analyses read" ON public.analyses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own analyses insert" ON public.analyses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own analyses update" ON public.analyses FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own analyses delete" ON public.analyses FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.batches (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, analysis_id uuid REFERENCES public.analyses(id) ON DELETE SET NULL, product_name text NOT NULL, destination text NOT NULL DEFAULT '', dispatched_at timestamptz NOT NULL DEFAULT now(), expires_at timestamptz NOT NULL, packaging text NOT NULL, passport jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.batches TO authenticated;
GRANT ALL ON public.batches TO service_role;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own batches read" ON public.batches FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own batches insert" ON public.batches FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own batches update" ON public.batches FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own batches delete" ON public.batches FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER analyses_updated BEFORE UPDATE ON public.analyses FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER batches_updated BEFORE UPDATE ON public.batches FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE OR REPLACE FUNCTION public.create_profile_for_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN INSERT INTO public.profiles (id, display_name, account_type) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''), CASE WHEN NEW.raw_user_meta_data->>'account_type' = 'farmer' THEN 'farmer' ELSE 'enterprise' END); RETURN NEW; END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_profile_for_new_user();