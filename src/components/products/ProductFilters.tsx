import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  minRating: number;
  inStock: boolean;
}

const categories = ['Men', 'Women', 'Kids', 'Accessories'];

export default function ProductFilters({ onFilterChange, onReset }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    applyFilters({ categories: updated });
  };

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    applyFilters({ priceRange: range });
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
    applyFilters({ minRating: rating });
  };

  const handleStockToggle = (checked: boolean) => {
    setInStock(checked);
    applyFilters({ inStock: checked });
  };

  const applyFilters = (partialFilters: Partial<FilterState>) => {
    onFilterChange({
      priceRange,
      categories: selectedCategories,
      minRating,
      inStock,
      ...partialFilters,
    });
  };

  const handleReset = () => {
    setPriceRange([0, 10000]);
    setSelectedCategories([]);
    setMinRating(0);
    setInStock(false);
    onReset();
  };

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <X className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label
                  htmlFor={category}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </Label>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Minimum Rating</Label>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleRatingChange(rating)}
              >
                <Checkbox
                  id={`rating-${rating}`}
                  checked={minRating === rating}
                />
                <Label
                  htmlFor={`rating-${rating}`}
                  className="text-sm font-normal cursor-pointer flex items-center"
                >
                  {rating}
                  <span className="ml-1 text-yellow-500">★</span> & above
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Availability */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStock}
            onCheckedChange={handleStockToggle}
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            In Stock Only
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
