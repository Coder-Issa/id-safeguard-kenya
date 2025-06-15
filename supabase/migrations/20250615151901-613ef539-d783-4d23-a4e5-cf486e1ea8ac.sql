
-- Allow admins to view all profiles, users can still view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users and admins can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = id OR public.has_role(auth.uid(), 'admin')
);

-- Allow admins to view all user_roles, users can still view their own roles
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

CREATE POLICY "Users and admins can view user roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id OR public.has_role(auth.uid(), 'admin')
);

-- (Insert/update policies remain unchanged)
