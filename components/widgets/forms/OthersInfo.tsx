import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const OthersInfo = ({ form }: any) => {
    return (
        <>
            <div className="my-7">
                <h2 className="text-xl md:text-2xl font-bold leading-tight capitalize mt-3 mb-4 underline decoration-primary">Key Sales / Marketing Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-7">
                    <FormField
                        control={form.control}
                        name="salesName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex flex-wrap items-center gap-2 leading-5 text-black dark:text-white">
                                    First & Last Name: <FormMessage />
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
                                    Email: <FormMessage />
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
                                    Phone Number: <FormMessage />
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
            <div className="my-7">
                <h2 className="text-xl md:text-2xl font-bold leading-tight capitalize mt-3 mb-4 underline decoration-primary">Key Technical Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-7">
                    <FormField
                        control={form.control}
                        name="techName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex flex-wrap items-center gap-2 leading-5 text-black dark:text-white">
                                    First & Last Name: <FormMessage />
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
                                    Email: <FormMessage />
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
                                    Phone Number: <FormMessage />
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
            <div className="my-7">
                <h2 className="text-xl md:text-2xl font-bold leading-tight capitalize mt-3 mb-4 underline decoration-primary">Key Billing Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-7">
                    <FormField
                        control={form.control}
                        name="billingName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold flex flex-wrap items-center gap-2 leading-5 text-black dark:text-white">
                                    First & Last Name: <FormMessage />
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
                                    Email: <FormMessage />
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
                                    Phone Number: <FormMessage />
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