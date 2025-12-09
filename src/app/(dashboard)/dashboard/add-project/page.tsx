"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Plus, X, Loader2, Image as ImageIcon, AlertCircle, Calendar } from "lucide-react"
import Link from "next/link"
import { createProject } from "@/lib/apis"
import Image from "next/image"

export default function AddProjectPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [techInput, setTechInput] = useState("")
    const [featureInput, setFeatureInput] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        liveSiteUrl: "",
        frontendGitUrl: "",
        backendGitUrl: "",
        thumbnail: "",
        techStack: [] as string[],
        features: [] as string[],
        startDate: "",
        endDate: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (error) setError("")
    }

    const handleAddTech = () => {
        if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
            setFormData({
                ...formData,
                techStack: [...formData.techStack, techInput.trim()]
            })
            setTechInput("")
        }
    }

    const handleRemoveTech = (tech: string) => {
        setFormData({
            ...formData,
            techStack: formData.techStack.filter(t => t !== tech)
        })
    }

    const handleAddFeature = () => {
        if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
            setFormData({
                ...formData,
                features: [...formData.features, featureInput.trim()]
            })
            setFeatureInput("")
        }
    }

    const handleRemoveFeature = (feature: string) => {
        setFormData({
            ...formData,
            features: formData.features.filter(f => f !== feature)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Validation
        if (!formData.name.trim()) {
            setError("Project name is required")
            setIsLoading(false)
            return
        }

        if (!formData.description.trim()) {
            setError("Description is required")
            setIsLoading(false)
            return
        }

        if (!formData.liveSiteUrl.trim()) {
            setError("Live site URL is required")
            setIsLoading(false)
            return
        }

        if (!formData.startDate) {
            setError("Start date is required")
            setIsLoading(false)
            return
        }

        if (formData.techStack.length === 0) {
            setError("Add at least one technology")
            setIsLoading(false)
            return
        }

        try {
            const projectData = {
                ...formData,
                frontendGitUrl: formData.frontendGitUrl || undefined,
                backendGitUrl: formData.backendGitUrl || undefined,
                thumbnail: formData.thumbnail || undefined,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,

            }

            await createProject(projectData)
            router.push("/dashboard")
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create project. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background">
          
            <div className="border-b">
                <div className="py-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Create New Project</h1>
                    <p className="text-muted-foreground mt-2">Showcase your work and achievements</p>
                </div>
            </div>

            {/* Form */}
            <div className="py-8">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Error Alert */}
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Project Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Project Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="My Awesome Project"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description <span className="text-destructive">*</span>
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Describe your project, its purpose, and what makes it special..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        rows={6}
                                        className="resize-none"
                                        required
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        {formData.description.length} characters
                                    </p>
                                </div>

                                {/* Thumbnail URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="thumbnail">Project Thumbnail</Label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="thumbnail"
                                                name="thumbnail"
                                                type="url"
                                                placeholder="https://example.com/project-image.jpg"
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
                            </CardContent>
                        </Card>

                        {/* Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Live Site URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="liveSiteUrl">
                                        Live Site URL <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="liveSiteUrl"
                                        name="liveSiteUrl"
                                        type="url"
                                        placeholder="https://myproject.com"
                                        value={formData.liveSiteUrl}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Frontend Git URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="frontendGitUrl">Frontend Repository URL</Label>
                                    <Input
                                        id="frontendGitUrl"
                                        name="frontendGitUrl"
                                        type="url"
                                        placeholder="https://github.com/username/frontend-repo"
                                        value={formData.frontendGitUrl}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Backend Git URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="backendGitUrl">Backend Repository URL</Label>
                                    <Input
                                        id="backendGitUrl"
                                        name="backendGitUrl"
                                        type="url"
                                        placeholder="https://github.com/username/backend-repo"
                                        value={formData.backendGitUrl}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tech Stack & Features */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Technologies & Features</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Tech Stack */}
                                <div className="space-y-2">
                                    <Label htmlFor="techStack">
                                        Tech Stack <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="techStack"
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleAddTech()
                                                }
                                            }}
                                            placeholder="e.g., React, Next.js, TypeScript"
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            onClick={handleAddTech}
                                            disabled={!techInput.trim() || isLoading}
                                            variant="outline"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {formData.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {formData.techStack.map((tech) => (
                                                <Badge key={tech} variant="secondary" className="gap-1">
                                                    {tech}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTech(tech)}
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

                                {/* Features */}
                                <div className="space-y-2">
                                    <Label htmlFor="features">Key Features</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="features"
                                            value={featureInput}
                                            onChange={(e) => setFeatureInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleAddFeature()
                                                }
                                            }}
                                            placeholder="e.g., Real-time updates, User authentication"
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            onClick={handleAddFeature}
                                            disabled={!featureInput.trim() || isLoading}
                                            variant="outline"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {formData.features.length > 0 && (
                                        <ul className="mt-2 space-y-2">
                                            {formData.features.map((feature, index) => (
                                                <li key={index} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                                                    <span className="text-sm">{feature}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveFeature(feature)}
                                                        className="text-destructive hover:text-destructive/80"
                                                        disabled={isLoading}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Timeline</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Start Date */}
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate">
                                            Start Date <span className="text-destructive">*</span>
                                        </Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="startDate"
                                                name="startDate"
                                                type="date"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* End Date */}
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate">End Date (Optional)</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="endDate"
                                                name="endDate"
                                                type="date"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                                className="pl-10"
                                                min={formData.startDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

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
                                "Create Project"
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