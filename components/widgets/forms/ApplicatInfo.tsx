import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const ApplicatInfo = ({ form }: any) => {
    return (
        <div className='px-5 md:px-10 md:py-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-7">
                <FormField
                    control={form.control}
                    name="fullName"
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
                    name="email"
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
                                    type='email'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
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

            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem className="my-7">
                        <FormLabel className="font-bold flex items-center gap-2">
                            Remarks:
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder=""
                                className="resize-none"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    )
}

export default ApplicatInfo