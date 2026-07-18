<!--
it will first check wishlist avail
if yes checks length else return undefined
 null ko handle karne ke liye best
if (!wishlist?.length) {
   return <EmptyState />;
} -->

<!-- const wishlist = [];
console.log(wishlist.length); // 0
!wishlist.length // !0 => true

but when wishlist=null
it will give exception trying to access lenght on  null
-->
