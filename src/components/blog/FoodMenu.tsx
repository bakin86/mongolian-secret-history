import Image from "@/components/common/Image";

interface MenuOption {
  label?: string;
  price: string;
}

interface MenuItem {
  name: string;
  desc: string;
  image: string;
  options: MenuOption[];
}

interface MenuCategory {
  title: string;
  icon: string;
  items: MenuItem[];
}

const menu: MenuCategory[] = [
  {
    title: "Appetizers",
    icon: "🥗",
    items: [
      {
        name: "Green leafy salad with cheese",
        desc: "Fresh greens, cheese, herbs, house dressing",
        image: "/images/food-salad.jpg",
        options: [{ price: "₮20,000" }],
      },
      {
        name: "Pan fried mixed vegetable salad with chicken breast",
        desc: "Warm vegetables, grilled chicken, light sauce",
        image: "/images/food-salad.jpg",
        options: [{ price: "₮28,000" }],
      },
      {
        name: "Pan fried bell pepper with beef tenderloin",
        desc: "Sweet peppers, tender beef, garlic glaze",
        image: "/images/food-bbq.jpg",
        options: [{ price: "₮28,000" }],
      },
    ],
  },
  {
    title: "Soups",
    icon: "🍲",
    items: [
      {
        name: "Chicken and mushroom soup",
        desc: "Slow-simmered chicken, forest mushrooms",
        image: "/images/food-soup.jpg",
        options: [{ price: "₮20,000" }],
      },
      {
        name: "Meatball and tomato soup",
        desc: "Hand-rolled meatballs, rich tomato broth",
        image: "/images/food-soup.jpg",
        options: [
          { label: "Regular", price: "₮26,000" },
          { label: "Light", price: "₮20,000" },
        ],
      },
      {
        name: "Creamy pumpkin soup",
        desc: "Roasted pumpkin, cream, toasted seeds",
        image: "/images/food-soup.jpg",
        options: [{ price: "₮20,000" }],
      },
    ],
  },
  {
    title: "Mongolian Soup",
    icon: "🥣",
    items: [
      {
        name: "Noodle soup",
        desc: "Hand-cut noodles, beef, steppe herbs",
        image: "/images/food-soup.jpg",
        options: [{ price: "₮20,000" }],
      },
      {
        name: "Traditional cream soup",
        desc: "Classic nomadic creamy broth",
        image: "/images/food-soup.jpg",
        options: [{ price: "₮19,000" }],
      },
      {
        name: "Dumpling soup with lamb ribs",
        desc: "Bansh dumplings, tender lamb ribs",
        image: "/images/food-buuz.jpg",
        options: [{ price: "₮28,000" }],
      },
      {
        name: "Collagen soup with traditional fried dumpling",
        desc: "Slow-cooked rich broth, crispy dumpling",
        image: "/images/food-khuushuur.jpg",
        options: [{ price: "₮20,000" }],
      },
      {
        name: "Clear soup with mushroom beef and fried flat bread",
        desc: "Clear beef broth, mushrooms, crispy bread",
        image: "/images/food-soup.jpg",
        options: [{ price: "₮27,000" }],
      },
    ],
  },
  {
    title: "Special Dish",
    icon: "👑",
    items: [
      {
        name: "Mongolian food collection",
        desc: "A grand platter of nomadic specialties for sharing — khorkhog, buuz, khuushuur, and more",
        image: "/images/food-khorkhog.jpg",
        options: [{ price: "₮228,000" }],
      },
    ],
  },
  {
    title: "Mongolian Dishes",
    icon: "🍖",
    items: [
      {
        name: "Mongolian noodle dish with beef brisket",
        desc: "Handmade noodles, slow-cooked brisket",
        image: "/images/food-tsuivan.jpg",
        options: [{ price: "₮32,000" }],
      },
      {
        name: "Fried beef brisket",
        desc: "Crispy-edged brisket, traditional spices",
        image: "/images/food-bbq.jpg",
        options: [{ price: "₮45,000" }],
      },
      {
        name: "Pan fried lamb",
        desc: "Pasture-raised lamb, seared to perfection",
        image: "/images/food-bbq.jpg",
        options: [{ price: "₮38,000" }],
      },
      {
        name: "Pan fried lamb ribs",
        desc: "Juicy ribs, caramelized edges",
        image: "/images/food-bbq.jpg",
        options: [{ price: "₮39,000" }],
      },
      {
        name: "Traditional fried meat dumpling",
        desc: "Khuushuur — golden fried dumplings",
        image: "/images/food-khuushuur.jpg",
        options: [{ price: "₮39,000" }],
      },
      {
        name: "Traditional steamed meat dumpling",
        desc: "Buuz — classic steamed dumplings",
        image: "/images/food-buuz.jpg",
        options: [{ price: "₮36,000" }],
      },
      {
        name: "Traditional dumpling with vegetables",
        desc: "Steamed dumplings with garden vegetables",
        image: "/images/food-buuz.jpg",
        options: [{ price: "₮29,000" }],
      },
    ],
  },
  {
    title: "Main Dish",
    icon: "🥩",
    items: [
      {
        name: "Beef tenderloin steak with side dish",
        desc: "Prime tenderloin, seasonal sides",
        image: "/images/food-bbq.jpg",
        options: [{ price: "₮69,000" }],
      },
      {
        name: "Grilled pork ribs with side dish",
        desc: "Smoky grilled ribs, house sauce",
        image: "/images/food-bbq.jpg",
        options: [{ price: "₮49,000" }],
      },
      {
        name: "Fried chicken with side dish",
        desc: "Crispy fried chicken, fresh sides",
        image: "/images/food-bbq.jpg",
        options: [{ price: "₮44,000" }],
      },
    ],
  },
  {
    title: "Pasta",
    icon: "🍝",
    items: [
      {
        name: "Creamy tagliette with smoked pork",
        desc: "Silky cream sauce, smoked pork",
        image: "/images/food-tsuivan.jpg",
        options: [{ price: "₮32,000" }],
      },
      {
        name: "Spicy spaghetti with grilled chicken",
        desc: "Chili-kissed spaghetti, charred chicken",
        image: "/images/food-tsuivan.jpg",
        options: [{ price: "₮34,000" }],
      },
    ],
  },
  {
    title: "Pizza",
    icon: "🍕",
    items: [
      {
        name: "Meat lovers",
        desc: "Loaded with assorted meats",
        image: "/images/food-bbq.jpg",
        options: [
          { label: '15"', price: "₮42,000" },
          { label: '18"', price: "₮49,000" },
        ],
      },
      {
        name: "Chicken & bacon",
        desc: "Grilled chicken, crispy bacon",
        image: "/images/food-bbq.jpg",
        options: [
          { label: '15"', price: "₮38,000" },
          { label: '18"', price: "₮45,000" },
        ],
      },
      {
        name: "Hawaii",
        desc: "Ham, pineapple, mozzarella",
        image: "/images/food-bbq.jpg",
        options: [
          { label: '15"', price: "₮43,000" },
          { label: '18"', price: "₮49,000" },
        ],
      },
      {
        name: "Cheese",
        desc: "Classic four-cheese blend",
        image: "/images/food-bbq.jpg",
        options: [
          { label: '15"', price: "₮36,000" },
          { label: '18"', price: "₮46,000" },
        ],
      },
    ],
  },
  {
    title: "Drinks",
    icon: "🍵",
    items: [
      {
        name: "Suutei tsai (milk tea)",
        desc: "Traditional salted milk tea",
        image: "/images/food-suutei-tsai.jpg",
        options: [{ price: "₮5,000" }],
      },
      {
        name: "Airag (fermented mare's milk)",
        desc: "Seasonal nomadic specialty",
        image: "/images/food-suutei-tsai.jpg",
        options: [{ price: "₮8,000" }],
      },
    ],
  },
];

function NutritionIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="#F8F3EF" />
    </svg>
  );
}

function PriceTagIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#E8912D">
      <path d="M20.59 13.41L11 3.83A2 2 0 0 0 9.59 3.24H4a2 2 0 0 0-2 2v5.59c0 .53.21 1.04.59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l5.59-5.59a2 2 0 0 0 0-2.83zM6.5 8A1.5 1.5 0 1 1 8 6.5 1.5 1.5 0 0 1 6.5 8z" />
    </svg>
  );
}

export default function FoodMenu() {
  return (
    <section className="bg-[#F8F3EF] dark:bg-slate-950 py-16 lg:py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="text-center font-display text-3xl md:text-4xl text-slate-900 dark:text-white mb-14">
          Menu
        </h2>

        {menu.map((category) => (
          <div key={category.title} className="mb-14">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-lg">{category.icon}</span>
              <h3 className="font-display text-xl text-slate-900 dark:text-white">{category.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-5 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-4 shadow-[0_2px_12px_rgba(58,46,42,0.06)]"
                >
                  <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-full border-4 border-[#F8F3EF] dark:border-slate-800">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-[17px] text-slate-900 dark:text-white leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] font-medium text-slate-800 dark:text-slate-200">
                      <span className="flex items-center gap-1">
                        Nutrition facts <NutritionIcon />
                      </span>
                      <span className="flex items-center gap-1">
                        Allergens <NutritionIcon />
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2">
                      {item.options.map((opt, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-[12px]">
                          {opt.label && (
                            <span className="text-slate-500 dark:text-slate-400">{opt.label}</span>
                          )}
                          <span className="font-semibold text-slate-900 dark:text-white">{opt.price}</span>
                          <PriceTagIcon />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
