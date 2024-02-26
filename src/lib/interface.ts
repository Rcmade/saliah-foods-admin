export interface User {
  name: string;
  email: string;
  role: string;
  phone?: number | string;
  token?: string;
  _id?: string;
}
export interface CountryStateData {
  [key: string]: string[];
}

export interface Product {
  name: string;
  image: string;
  price: number;
  category: string;
  unit?: string; // Optional property
}

export interface OrderItem {
  id: number;
  quantity: number;
  total: number;
  product: Product;
}


export interface RazorpayPaymentSuccess {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}