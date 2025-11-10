# Admin Setup Guide

## Creating Your First Admin User

To create an admin user for your Vastra Bazaar application, follow these steps:

### Step 1: Sign Up

1. Go to the signup page: `/auth/signup`
2. Create a new account with your email and password
3. The account will be auto-confirmed (no email verification needed)

### Step 2: Grant Admin Access

After signing up, you need to manually add the admin role to your user account in the database.

1. Open the Lovable Cloud backend (click "View Backend" button)
2. Navigate to the Database section
3. Go to the `user_roles` table
4. Click "Insert" to add a new row
5. Fill in the following:
   - `user_id`: Your user ID (found in the `profiles` table or auth.users)
   - `role`: Select "admin" from the dropdown
6. Click "Save"

### Step 3: Verify Admin Access

1. Log out and log back in
2. Try accessing the admin dashboard at `/admin`
3. You should now have access to manage products

## Admin Features

Once you have admin access, you can:

- **View all products**: See the complete product catalog
- **Add new products**: Create new product listings with images, pricing, and details
- **Edit products**: Update existing product information
- **Delete products**: Remove products from the catalog
- **View all orders**: Monitor customer orders (future feature)

## Security Notes

- Admin role is stored in a separate `user_roles` table (NOT on the profile)
- RLS policies ensure only admins can manage products
- The system uses Supabase Row Level Security for data protection
- Admin status is verified server-side, not client-side

## Troubleshooting

**Can't access admin dashboard?**
- Verify your user has the 'admin' role in the `user_roles` table
- Make sure you're logged in
- Clear browser cache and try again

**Products not showing?**
- Check that products exist in the database
- Verify RLS policies are correctly applied
- Check browser console for errors

## Database Tables

Key tables for the application:

- `profiles`: User profile information
- `user_roles`: User role assignments (admin, user, vendor)
- `products`: Product catalog
- `cart_items`: User shopping carts
- `orders`: Customer orders
