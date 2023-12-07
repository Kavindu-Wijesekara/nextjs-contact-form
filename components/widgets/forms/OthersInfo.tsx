import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const OthersInfo = ({ form }: any) => {
    return (
        <>
            <div className="border border-primary rounded-[2.3rem] relative mt-8">
                <h2 className="text-base lg:text-xl text-primary leading-tight capitalize mb-4 inline-block absolute -mt-6 ml-8 p-2 bg-background">Key Sales / Marketing Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-7 px-5 md:px-10 md:py-4">
                    <FormField
                        control={form.control}
                        name="salesName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex flex-wrap items-center gap-2 leading-5 text-black dark:text-white">
                                    First & Last Name (Required): <FormMessage />
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
                        name="salesEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex items-center gap-2 leading-5 text-black dark:text-white">
                                    Email (Required): <FormMessage />
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
                        name="salesPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex items-center gap-2 leading-5 text-black dark:text-white">
                                    Phone Number (Required): <FormMessage />
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
            </div>

            {/* Tech lead */}
            <div className="border border-primary rounded-[2.3rem] relative mt-8">
                <h2 className="text-base lg:text-xl text-primary leading-tight capitalize mb-4 inline-block absolute -mt-6 ml-8 p-2 bg-background">Key Technical Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-7 px-5 md:px-10 md:py-4">
                    <FormField
                        control={form.control}
                        name="techName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex flex-wrap items-center gap-2 leading-5 text-black dark:text-white">
                                    First & Last Name (Required): <FormMessage />
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
                        name="techEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex items-center gap-2 leading-5 text-black dark:text-white">
                                    Email (Required): <FormMessage />
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
                        name="techPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex items-center gap-2 leading-5 text-black dark:text-white">
                                    Phone Number (Required): <FormMessage />
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
            </div>

            {/* Billing lead */}
            <div className="border border-primary rounded-[2.3rem] relative mt-8">
                <h2 className="text-base lg:text-xl text-primary leading-tight capitalize mb-4 inline-block absolute -mt-6 ml-8 p-2 bg-background">Key Billing Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-7 px-5 md:px-10 md:py-4">
                    <FormField
                        control={form.control}
                        name="billingName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex flex-wrap items-center gap-2 leading-5 text-black dark:text-white">
                                    First & Last Name (Required): <FormMessage />
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
                        name="billingEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex items-center gap-2 leading-5 text-black dark:text-white">
                                    Email (Required): <FormMessage />
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
                        name="billingPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex items-center gap-2 leading-5 text-black dark:text-white">
                                    Phone Number (Required): <FormMessage />
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
            </div>
        </>
    )
}

export default OthersInfo