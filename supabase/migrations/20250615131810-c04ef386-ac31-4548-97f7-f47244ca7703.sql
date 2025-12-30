
-- Allow all authenticated users to SELECT (view/search) all/own found IDs
DROP POLICY IF EXISTS "User can view own cards" ON public.found_id_cards;

CREATE POLICY "Authenticated users can view own cards"
ON public.found_id_cards
FOR SELECT
TO authenticated
USING (true);

-- Keep existing policies for insert, update and delete
-- (These are already present per your migration scripts, so we leave them as is)
