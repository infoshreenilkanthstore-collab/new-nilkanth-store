import { Home, ShoppingCart, Search, Heart, User } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function MobileDock({ activePage = 'home', onNavigate, onOpenSearch, onOpenAuth, currentUser }) {
  const { wishlistCount, openDrawer } = useWishlist();
  const { cartCount, openCart } = useCart();
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        <button 
          onClick={() => onNavigate?.('home')}
          className={`flex flex-col items-center justify-center flex-1 cursor-pointer transition-colors ${
            activePage === 'home' ? 'text-[#700b10]' : 'text-stone-500 hover:text-[#700b10]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </button>
        <button 
          type="button"
          onClick={openCart}
          className="relative flex flex-col items-center justify-center flex-1 cursor-pointer transition-colors text-stone-500 hover:text-[#700b10]"
          aria-label="Cart"
        >
          <div className="relative inline-flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-0.5 bg-[#700b10] text-white text-[8.5px] font-extrabold font-nunito rounded-full flex items-center justify-center border border-white shadow-2xs leading-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5">Cart</span>
        </button>
        <button 
          type="button"
          onClick={() => onOpenSearch ? onOpenSearch() : onNavigate?.('search')}
          className={`flex flex-col items-center justify-center flex-1 cursor-pointer transition-colors ${
            activePage === 'search' ? 'text-[#700b10]' : 'text-stone-500 hover:text-[#700b10]'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Search</span>
        </button>
        <button 
          type="button"
          onClick={() => onNavigate?.('wishlist')}
          className={`relative flex flex-col items-center justify-center flex-1 cursor-pointer transition-colors ${
            activePage === 'wishlist' ? 'text-[#700b10]' : 'text-stone-500 hover:text-[#700b10]'
          }`}
        >
          <div className="relative inline-flex items-center justify-center">
            <Heart className={`w-5 h-5 ${activePage === 'wishlist' || wishlistCount > 0 ? 'fill-current' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-0.5 bg-[#700b10] text-white text-[8.5px] font-extrabold font-nunito rounded-full flex items-center justify-center border border-white shadow-2xs leading-none">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5">Wishlist</span>
        </button>
        <button 
          type="button"
          onClick={() => {
            if (currentUser) {
              onNavigate?.('profile');
            } else {
              onOpenAuth?.();
            }
          }}
          className={`flex flex-col items-center justify-center flex-1 cursor-pointer transition-colors ${
            currentUser ? 'text-[#700b10]' : 'text-stone-500 hover:text-[#700b10]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">
            {currentUser ? 'Account' : 'Profile'}
          </span>
        </button>
      </div>
    </div>
  );
}
