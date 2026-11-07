# Image sources and treatment

The storefront uses 83 sourced product images, not a verified inventory of 83 unique SKUs. A photographed color, wash, or coordinated look is a separate catalog entry. The user accepted 83 and requested further work focus on design. Availability, sizes, fabric composition, and official product names remain unverified.

- 41 original still images from Space's product highlights (4 base photos plus 37 imports).
- 37 retouched product video frames from the Winter Sale highlight are included. Each has a transcribed price in `sale-products.json`; original frames are retained under `raw-frames` for comparison. Additional unused source frames remain outside the public catalog. These are historical highlight prices, not a live inventory feed.
- 5 product reel-cover photos from the same account fill the shortfall after the available highlight imagery was exhausted. Their exact post URLs are preserved with each record and in `scripts/additional-source-photos.json`. These covers were already observed on the account's rendered profile before download. No price overlays were present on them.

The 41 still images were visually reviewed and had no visible price overlay. Included video frames were individually edited with the built-in image editing tool to remove Instagram interface and price overlays. Garments, colors, pose and the central scene were constrained to remain faithful; obscured pixels are reconstructed. These are retouched video frames, not untouched original product photographs. Root prompt/output records are in `review/retouch-root.json` and `review/retouch-batch-25-30.json`. Delivery copies are compressed JPEGs; original generated PNGs are retained in `source-assets/retouched` with matching `sale-NN` filenames.

At the user's request, products without visible source prices receive explicitly labeled approximate prices. Category guides are Sets $35, Hoodies $20, Sweaters $20, Jeans $20, Wool sweaters $25, Outerwear $30, and Trousers $15. These are estimates informed by the visible store highlight prices and comparable clothing types, not verified store quotes. The source price remains null in `sourcePrice`; `priceIsEstimate` distinguishes estimates from transcribed prices. Before purchasing, the visitor sends an inquiry to the store for current pricing, sizing, and stock. The website does not process payments.

## Design references

- [COS Spring/Summer 2026 menswear](https://www.cos.com/en-gb/campaign/spring-summer-2026-menswear): contemporary editorial direction and considered wardrobe presentation.
- [Massimo Dutti menswear](https://www.massimodutti.com/gb/men-n1343): restrained luxury styling reference.
- [House of Power source](https://github.com/Hsenghaddar/house-of-power), inspected at commit `d4c5fcb62a9486cded10bf052638c6b100301137`: interaction reference for sticky navigation, search previews, category menu drawer, bag count, quantity controls and continue-exploring behavior. Space's implementation and visual styling are original.

The SPACE text wordmark is an original typographic treatment in the account's requested white/gold direction, not an extracted official logo file.

## Space Kids extension — November 7, 2026

Reviewed the public `spacekids.leb` profile, its two highlights, and 70 observed reel-cover product images through the user's open Instagram tab. Selected 28 clear product photographs from the reels: full outfits on models or hangers, knitwear, denim, dresses, and baby pieces. Promotional slides, blurry frames, and images with editorial text over the garments were excluded. These are original reel-cover photographs, not newly generated outfits or separately extracted video frames.

The 28 delivered JPEGs are in `public/products/kids/`, resized to a maximum width of 900px and encoded at quality 88. `public/kids-products.json` records each original reel URL, source caption, source account, visible size range where present, category, and price provenance. Three prices were transcribed from source captions; the remaining 25 are approximate display prices requested by the user. The displayed estimate prefix was removed at the user's earlier request; `sourcePrice` and `priceIsEstimate` retain the distinction in the data.

The public kids profile describes itself as “HOME OF MINI EXPLORERS” and lists Ghazieh main road and 78 999 072. That phone number is used for Kids inquiries and Kids-only WhatsApp orders. Mixed orders retain the existing Men's destination and identify departments on each line. Whish remains design-only.

The existing 83 men's products remain intact. Home retains the architectural hero and men's category section, adds a Men/Kids entry section, and features two pieces from each collection. Men is the default shop collection. The site uses the same ivory, charcoal, and champagne-gold design for both accounts.

Matching color records are now grouped into 62 product styles, retaining all 111 source photographs as variants or gallery images. Grouping uses the source collection and style name, with explicit aliases for the initial men's sets and overview collages. Different snap-front and button-front jackets remain separate, as do unverified tracksuit designs from different sources. Swatches change the selected source photo and price. S/M/L are prototype size choices added at the user's explicit request; no stock availability has been verified. Bag entries distinguish product, color, and size.

The Space Men home card now uses the existing higher-resolution `post-oysho.jpg` reel photograph, framed at `center 14%` to keep the model's full head inside the card on desktop and phone. No recoloring or image synthesis was used for this change.

Before this update, the working `src/App.jsx` had reverted to an early storefront version. A backup was kept in `review/kids/App-before-kids.jsx`, and the last committed version was used to preserve the approved hero, favorites, bag, and checkout features while implementing the extension.
