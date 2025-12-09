
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Plus, X, Loader2, Image as ImageIcon, AlertCircle } from "lucide-react"
import Link from "next/link"
import { createBlog } from "@/lib/apis"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

export default function AddBlogPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [tagInput, setTagInput] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        thumbnail: "",
        isFeatured: false,
        tags: [] as string[]
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (error) setError("")
    }

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            })
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Validation
        if (!formData.title.trim()) {
            setError("Title is required")
            setIsLoading(false)
            return
        }

        if (!formData.content.trim()) {
            setError("Content is required")
            setIsLoading(false)
            return
        }

        try {
            await createBlog(formData)
            router.push("/dashboard")
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create blog. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b">
                <div className="py-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Create New Blog</h1>
                    <p className="text-muted-foreground mt-2">Share your thoughts and insights</p>
                </div>
            </div>

            {/* Form */}
            <div className="py-8">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Blog Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Error Alert */}
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter blog title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <Label htmlFor="content">
                                    Content <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Write your blog content here..."
                                    value={formData.content}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    rows={12}
                                    className="resize-none"
                                    required
                                />
                                <p className="text-sm text-muted-foreground">
                                    {formData.content.length} characters
                                </p>
                            </div>

                            {/* Thumbnail URL */}
                            <div className="space-y-2">
                                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="thumbnail"
                                            name="thumbnail"
                                            type="url"
                                            placeholder="https://example.com/image.jpg"
                                            value={formData.thumbnail}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                {formData.thumbnail && (
                                    <div className="mt-2 p-2 border rounded-lg">
                                        <Image
                                            src={formData.thumbnail}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="tags"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                handleAddTag()
                                            }
                                        }}
                                        placeholder="Add a tag and press Enter"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleAddTag}
                                        disabled={!tagInput.trim() || isLoading}
                                        variant="outline"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                {formData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="gap-1">
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="ml-1 hover:text-destructive"
                                                    disabled={isLoading}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Featured Toggle */}
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label htmlFor="featured">Featured Blog</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Display this blog on the featured section
                                    </p>
                                </div>
                                <Switch
                                    id="featured"
                                    checked={formData.isFeatured}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, isFeatured: checked })
                                    }
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Publish Blog"
                            )}
                        </Button>
                        <Link href="/dashboard" className="flex-1">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                disabled={isLoading}
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}