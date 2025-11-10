-- Update products table to match the Product type
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS subcategory text NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS images text[] DEFAULT ARRAY[]::text[],
ADD COLUMN IF NOT EXISTS rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
ADD COLUMN IF NOT EXISTS reviews integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS original_price numeric,
ADD COLUMN IF NOT EXISTS discount integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS vendor_id text,
ADD COLUMN IF NOT EXISTS vendor_name text,
ADD COLUMN IF NOT EXISTS offers text[] DEFAULT ARRAY[]::text[],
ADD COLUMN IF NOT EXISTS is_new boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_trending boolean DEFAULT false;

-- Rename stock_quantity to stock for consistency
ALTER TABLE public.products
RENAME COLUMN stock_quantity TO stock;

-- Create cart_items table for persistent cart
CREATE TABLE IF NOT EXISTS public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  is_try_cart boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, product_id, is_try_cart)
);

-- Enable RLS on cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for cart_items
CREATE POLICY "Users can view own cart items"
  ON public.cart_items
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON public.cart_items
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON public.cart_items
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON public.cart_items
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add trigger for cart_items updated_at
CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();