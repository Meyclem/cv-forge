import { useState, useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function Showcase() {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is already set
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setDarkMode(isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    if (typeof document !== "undefined") {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      document.documentElement.classList.toggle("dark", newDarkMode);
    }
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Component Showcase</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </Button>
          </div>
          <p className="text-muted-foreground">
            A demonstration of all shadcn/ui components for the CV Forge application
          </p>
        </div>

        <Separator />

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Different button variants and sizes for various actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🚀</Button>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Form Inputs</CardTitle>
            <CardDescription>
              Text inputs and textareas for user data entry
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-demo">Input</Label>
              <Input
                id="input-demo"
                placeholder="Enter your name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Current value: {inputValue || "(empty)"}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea-demo">Textarea</Label>
              <Textarea
                id="textarea-demo"
                placeholder="Write your professional summary..."
                rows={4}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Character count: {textareaValue.length}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Select Section */}
        <Card>
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>
              Dropdown selections for predefined options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="select-demo">Choose your skill level</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger id="select-demo">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              {selectValue && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectValue}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dialog Section */}
        <Card>
          <CardHeader>
            <CardTitle>Dialog</CardTitle>
            <CardDescription>
              Modal dialogs for confirmations and forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Badge Section */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>
              Status indicators and tags for categorization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge className="bg-green-500 text-white hover:bg-green-600">
                Custom
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Avatar Section */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>
              User profile pictures and placeholders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/broken-image.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* Separator Section */}
        <Card>
          <CardHeader>
            <CardTitle>Separator</CardTitle>
            <CardDescription>
              Visual dividers between content sections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Section 1</h4>
              <p className="text-sm text-muted-foreground">
                Some content in the first section
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium">Section 2</h4>
              <p className="text-sm text-muted-foreground">
                Some content in the second section
              </p>
            </div>
            <Separator orientation="horizontal" className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </CardContent>
        </Card>

        {/* Tooltip Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltip</CardTitle>
            <CardDescription>Helpful hints and additional information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a helpful tooltip!</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center justify-center rounded-md text-sm font-medium border px-4 py-2 cursor-help">
                    ℹ️ Info
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Click to learn more about this feature</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        {/* Card Examples */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Card Variations</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>A basic card layout</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Includes action buttons</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Some interesting content.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>With form elements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input placeholder="Enter value" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Option 1</SelectItem>
                    <SelectItem value="2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

