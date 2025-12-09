"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { deleteBlog, deleteProject, fetchBlogs, fetchProjects } from "@/lib/apis"
import { IBlog } from "@/types/blog"
import { IProject } from "@/types/project"
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { BarChart3, Edit, Eye, FileText, FolderKanban, Loader2, Plus, Trash2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardPage() {
 const [blogs, setBlogs] = useState<IBlog[]>([])
  const [projects, setProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteType, setDeleteType] = useState<'blog' | 'project' | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    const [blogsData, projectsData] = await Promise.all([
      fetchBlogs(100, 1),
      fetchProjects(100, 1)
    ])
    if (blogsData?.data) setBlogs(blogsData.data)
    if (projectsData?.data) setProjects(projectsData.data)
    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (!deleteId || !deleteType) return

    try {
      if (deleteType === 'blog') {
        await deleteBlog(deleteId)
        setBlogs(blogs.filter(b => b.id !== deleteId))
      } else {
        await deleteProject(deleteId)
        setProjects(projects.filter(p => p.id !== deleteId))
      }
    } catch (error) {
      console.error('Delete failed:', error)
    } finally {
      setDeleteId(null)
      setDeleteType(null)
    }
  }


  return (
      <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="py-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your blogs and projects</p>
        </div>
      </div>

      <div className=" py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blogs.length}</div>
              <p className="text-xs text-muted-foreground">Published articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">Completed works</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="blogs" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="blogs" className="gap-4 m-2 shadow-sm box-border">
                <FileText className="h-4 w-4" />
                Blogs
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-4  m-2 shadow-sm box-border">
                <FolderKanban className="h-4 w-4" />
                Projects
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Blogs Tab */}
          <TabsContent value="blogs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Blogs</h2>
              <Link href="/dashboard/add-blog">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Blog
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : blogs.length === 0 ? (
              <Card>
                <CardContent className="py-20 text-center">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first blog post</p>
                  <Link href="/dashboard/blogs/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Blog
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{blog.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {blog.content}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            {blog.author && <span>By {blog.author.name}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/blog/${blog.slug}`} target="_blank">
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/blog/${blog.slug}`}>
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setDeleteId(blog.id)
                              setDeleteType('blog')
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Projects</h2>
              <Link href="/dashboard/add-project">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : projects.length === 0 ? (
              <Card>
                <CardContent className="py-20 text-center">
                  <FolderKanban className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first project</p>
                  <Link href="/dashboard/projects/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-xl font-semibold flex-1">{project.name}</h3>
                        <div className="flex gap-2">
                          <Link href={`/project/${project.slug}`} target="_blank">
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/project/${project.slug}`}>
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setDeleteId(project.id)
                              setDeleteType('project')
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.techStack.slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="secondary">
                            +{project.techStack.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(project.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this {deleteType}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>


  )
}
