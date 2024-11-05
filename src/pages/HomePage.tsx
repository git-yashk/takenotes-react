import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNote, getNotes, Note } from "@/http/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FormSchema = z.object({
    title: z.string().max(500),
    content: z.string().max(5000),
    bg_color: z.optional(z.string()),
});

export default function HomePage() {

    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        (async () => {
            const response = await getNotes();
            setNotes(response);
        })();
    }, []);

    function toggleDialogBox() {
        form.resetField("title", { defaultValue: undefined });
        form.resetField("content", { defaultValue: undefined });
        form.resetField("bg_color", { defaultValue: undefined });
        setOpen(!open);
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: (response) => {
            console.log(response);
            setNotes([...notes, response]);
        },
        onError: () => {
            console.log("Error while creating note");
        },
    });

    function onSubmit(values: z.infer<typeof FormSchema>) {
        mutation.mutate(values);
        form.resetField("title", { defaultValue: undefined });
        form.resetField("content", { defaultValue: undefined });
        form.resetField("bg_color", { defaultValue: undefined });
        setOpen(false);
    }

    return (
        <>
            {/* header */}
            <header className="flex items-center justify-between border-b h-16 shadow-sm px-4">
                <Link to="/" className="flex items-center gap-3 select-none">
                    <svg height="32" fill="#09090b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                        <path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2c0 0 0 0 0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c0 0 0 0 0 0c19.8 27.1 39.7 54.4 49.2 86.2l160 0zM192 512c44.2 0 80-35.8 80-80l0-16-160 0 0 16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z" />
                    </svg>
                    <h1 className="text-xl text-[#09090b]">TakeNotes</h1>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="" />
                            <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mx-4">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuItem>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            {/* input note */}
            <section className="px-4">
                <Dialog open={open} onOpenChange={toggleDialogBox}>
                    <DialogTrigger asChild>
                        <div
                            className="m-8 w-full md:w-[567px] mx-auto border px-4 py-2 rounded-md cursor-text shadow-sm"
                        >Take a note...</div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[567px]">
                        <DialogHeader>
                            <DialogTitle>Take a note</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Title"
                                                    rows={1}
                                                    className="resize-none w-full"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Take a note..."
                                                    rows={5}
                                                    className="resize-none w-full"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bg_color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select note background" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="#FF91A4">
                                                        <div className="flex items-center gap-2">
                                                            <span>Salmon pink</span>
                                                            <div className="w-4 h-4 rounded-full bg-[#FF91A4] border border-black"></div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="#F0FFF0">
                                                        <div className="flex items-center gap-2">
                                                            <span>Honeydew</span>
                                                            <div className="w-4 h-4 rounded-full bg-[#F0FFF0] border border-black"></div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="#F2BDCD">
                                                        <div className="flex items-center gap-2">
                                                            <span>Orchid pink</span>
                                                            <div className="w-4 h-4 rounded-full bg-[#F2BDCD] border border-black"></div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="#AFDBF5">
                                                        <div className="flex items-center gap-2">
                                                            <span>Uranian blue</span>
                                                            <div className="w-4 h-4 rounded-full bg-[#AFDBF5] border border-black"></div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="#E3F988">
                                                        <div className="flex items-center gap-2">
                                                            <span>Mindaro</span>
                                                            <div className="w-4 h-4 rounded-full bg-[#E3F988] border border-black"></div>
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">Submit</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </section>

            {/* display notes */}
            <section className="px-4">
                {
                    notes.map((note) => (
                        <div key={note._id} className="m-4 md:w-[567px] mx-auto shadow-sm">
                            <Card className={`bg-[${note.bg_color}]`}>
                                <CardHeader>
                                    <CardTitle>{note.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm">
                                    <p>{note.content}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                }
            </section>
        </>
    )
}