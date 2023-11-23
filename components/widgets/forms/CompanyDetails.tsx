import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tiers, productCategories } from "@/data"
import { cn } from "@/lib/utils"
import { AlertCircle, Building2, HeartHandshake, User } from "lucide-react"

const businessType = [
    {
        id: "PVT Ltd",
        title: 'Private Limited',
        icon: Building2,
    },
    {
        id: "Partnership",
        title: 'Partnership',
        icon: HeartHandshake,
    },
    {
        id: "Sole Proprietor",
        title: 'Sole Proprietor',
        icon: User,
    }
]
const CompanyDetails = ({ form }: any) => {
    const brcFileRef = form.register('brc', { required: true })
    const idsFileRef = form.register('ids', { required: true })
    const form120FileRef = form.register('form120', { required: true })
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 my-7">
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="font-bold flex items-center gap-2">
                                Company Name (Required):
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    {...field}
                                    autoComplete="on"
                                    autoCapitalize="on"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="companyRegistrationNumber"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="font-bold flex items-center gap-2">
                                Business Registration Number (Required):
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    {...field}
                                    autoComplete="on"
                                    autoCapitalize="on"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                    <FormItem className="space-y-3 my-7">
                        <FormLabel className="font-bold flex items-center gap-2">
                            Select the Business Type (Required):
                        </FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 lg:grid-cols-3"
                            >
                                {
                                    businessType.map((item, index) => {
                                        const Icon = item.icon
                                        return (
                                            <FormItem key={index} className="flex items-center space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={item.id} className="peer hidden" />
                                                </FormControl>
                                                <FormLabel className="h-full w-full text-black dark:text-white cursor-pointer rounded-md border border-border p-4 shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-ring flex justify-between items-center bg-muted-foreground/10 peer-aria-checked:bg-primary/20">
                                                    {item.title}
                                                    <Icon />
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 my-7">
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold flex items-center gap-2">
                                Address (Required):
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    {...field}
                                    autoComplete="on"
                                    autoCapitalize="on"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold flex items-center gap-2">
                                City (Required):
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    {...field}
                                    autoComplete="on"
                                    autoCapitalize="on"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 my-7">
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold flex items-center gap-2">
                                State/Province (Required):
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    {...field}
                                    autoComplete="on"
                                    autoCapitalize="on"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold flex items-center gap-2">
                                Country:
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    {...field}
                                    autoComplete="on"
                                    autoCapitalize="on"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                    <FormItem className="my-7 w-full lg:w-1/2">
                        <FormLabel className="font-bold flex items-center gap-2">
                            Postal Code (Required):
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder=""
                                {...field}
                                autoComplete="on"
                                autoCapitalize="on"
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            {/* BRC */}
            <FormField
                control={form.control}
                name="brc"
                render={({ field }) => (
                    <FormItem className="my-7">
                        <FormLabel className="font-bold flex items-center gap-2 text-black dark:text-white">
                            Business Registration Certificate (PDF format Only and Maximum file size 5MB):
                        </FormLabel>
                        <FormControl>
                            <Input type="file" accept="application/pdf" {...brcFileRef} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* IDs */}
            <FormField
                control={form.control}
                name="ids"
                render={({ field }) => (
                    <FormItem className="my-7">
                        <FormLabel className="font-bold flex items-center gap-2 text-black dark:text-white">
                            ID Copies (PDF format Only and Maximum file size 10MB):
                        </FormLabel>
                        <FormControl>
                            <Input type="file" accept="application/pdf" {...idsFileRef} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                            All directors ID copies should be submitted. Please combine all the ID copies into a single PDF file.
                        </FormDescription>
                    </FormItem>
                )}
            />

            {/* Form 1/20 */}
            <FormField
                control={form.control}
                name="form120"
                render={({ field }) => (
                    <FormItem className={cn("my-7", form.watch("businessType") === "PVT Ltd" ? "block" : "hidden")}>
                        <FormLabel className="font-bold flex items-center gap-2 text-black dark:text-white">
                            Form 1/ Form 20 (PDF format Only and Maximum file size 5MB):
                        </FormLabel>
                        <FormControl>
                            <Input type="file" accept="application/pdf" {...form120FileRef} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                            Compulsory For Private Limited Companies.
                        </FormDescription>
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 my-7">
                {/* Tiers */}
                <FormField
                    control={form.control}
                    name="tier"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="font-bold flex items-center gap-2 text-black dark:text-white">
                                Select a Tier (Required):
                            </FormLabel>
                            <FormMessage />
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
        </>
    )
}

export default CompanyDetails