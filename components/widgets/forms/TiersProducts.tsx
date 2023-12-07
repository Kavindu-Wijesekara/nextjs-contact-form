import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tiers, productCategories } from "@/data"
import { cn } from "@/lib/utils"
import { AlertCircle, HelpCircle } from "lucide-react"

const TiersProducts = ({ form }: any) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 my-7 px-5 md:px-10 md:py-4">
            {/* Tiers */}
            <div className="">
                <FormField
                    control={form.control}
                    name="tier"
                    render={({ field }) => (
                        <FormItem className="">
                            {/* <FormLabel className="font-bold flex items-center gap-2 text-black dark:text-white">
                                    Select a Tier (Required):
                                </FormLabel> */}
                            <FormLabel className="font-bold flex items-center gap-2">
                                Select a Tier (Required):
                            </FormLabel>
                            {/* <FormMessage /> */}
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-1 md:grid-cols-2"
                                >
                                    {
                                        Tiers.map((item, index) => (
                                            <FormItem key={index} className="flex items-center space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={item.id} className="peer hidden" />
                                                </FormControl>
                                                <FormLabel className="h-full w-full text-black dark:text-white cursor-pointer rounded-md border border-border p-4 shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-ring flex justify-between items-center bg-muted-foreground/10 peer-aria-checked:bg-primary/20">
                                                    <div className="flex flex-col">
                                                        <span className="text-muted-foreground">{item.id}</span>
                                                        <span className="font-bold">{item.title}</span>
                                                    </div>
                                                    <Popover>
                                                        <PopoverTrigger><AlertCircle className=" cursor-help" /></PopoverTrigger>
                                                        <PopoverContent>
                                                            <div className="">
                                                                {item.features.map((feature, index) => (
                                                                    <div key={index}>
                                                                        <p className="text-primary">{feature.title}:</p>
                                                                        <p className="font-bold">{feature.description}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormLabel>
                                            </FormItem>
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="customTarget"
                    render={({ field }) => (
                        <FormItem className={cn(form.watch("tier") === "Custom" ? "block" : "hidden")}>
                            <FormLabel className="font-bold flex items-center gap-2 mt-4">
                                Custom Minimum Sales Target (Annual):
                                <Popover>
                                    <PopoverTrigger><HelpCircle className="w-4 h-4 cursor-help" /></PopoverTrigger>
                                    <PopoverContent className="bg-[#eed1ee]">
                                        <div className="">
                                            <p>Please enter your desired annual sales target in the field below. Your discount percentage will be calculated based on this target value.</p>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    {...field}
                                    autoComplete="on"
                                    autoCapitalize="on"
                                />
                            </FormControl>
                            <FormDescription>
                                Note: The discount percentage will be applied to your minimum sales target value for the year.
                            </FormDescription>
                        </FormItem>
                    )}
                />
            </div>

            {/* Forcused products */}
            <FormField
                control={form.control}
                name="forcusedProducts"
                render={() => (
                    <FormItem className="">
                        <FormLabel className="font-bold flex items-center gap-2 text-black dark:text-white">
                            Forcused Products (Required):
                        </FormLabel>
                        <FormMessage />
                        {productCategories.map((item) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="forcusedProducts"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, item.id])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                    (value: string) => value !== item.id
                                                                )
                                                            )
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-semibold text-black dark:text-white">
                                                {item.title}
                                            </FormLabel>
                                        </FormItem>
                                    )
                                }}
                            />
                        ))}
                    </FormItem>
                )}
            />
        </div>
    )
}

export default TiersProducts