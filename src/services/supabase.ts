import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/supabase';
import { Product } from '../types/product';

export async function fetchProducts() {
  try {
    console.log('Fetching products from:', `${SUPABASE_URL}/rest/v1/products`);
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Failed to fetch products: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Fetched products:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
}