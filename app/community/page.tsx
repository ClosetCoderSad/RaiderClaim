"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { ImageUpload } from "@/components/image-upload";
import { Users, Plus, Search, Hash, Calendar, User } from "lucide-react";
import Image from "next/image";

interface Post {
  _id: string;
  itemName: string;
  description: string;
  hashtags: string[];
  imageUrl?: string;
  studentId: string;
  createdAt: string;
  user: {
    name: string;
  };
}

export default function CommunityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportedItemId = searchParams.get("reportedItemId");
  const reportedLat = searchParams.get("latitude");
  const reportedLng = searchParams.get("longitude");

  const [reportedItems, setReportedItems] = useState<{
    [key: string]: { latitude: number; longitude: number };
  }>({});

  useEffect(() => {
    // Fetch reported pins for items
    const fetchPins = async () => {
      try {
        const response = await fetch("/api/pins");
        if (response.ok) {
          const pins = await response.json();
          const reported: { [key: string]: { latitude: number; longitude: number } } = {};
          pins.forEach((pin: any) => {
            if (pin.itemId && pin.latitude && pin.longitude) {
              reported[pin.itemId] = {
                latitude: pin.latitude,
                longitude: pin.longitude,
              };
            }
          });
          setReportedItems(reported);
        }
      } catch {
        // ignore errors
      }
    };
    fetchPins();
  }, []);

  // Update reportedItems if redirected from Report page
  useEffect(() => {
    if (reportedItemId && reportedLat && reportedLng) {
      setReportedItems((prev) => ({
        ...prev,
        [reportedItemId]: {
          latitude: Number(reportedLat),
          longitude: Number(reportedLng),
        },
      }));
    }
  }, [reportedItemId, reportedLat, reportedLng]);

  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    hashtags: "",
    imageUrl: "",
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsAuthenticated(true);
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, imageUrl: url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!formData.itemName || !formData.description) {
      setFormError("Item name and description are required");
      return;
    }
    setFormLoading(true);
    try {
      const token = localStorage.getItem("token");
      const hashtags = formData.hashtags.split(",").map((tag) => tag.trim()).filter(Boolean);
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, hashtags }),
      });
      if (response.ok) {
        const newPost = await response.json();
        setPosts((prev) => [newPost, ...prev]);
        setFormData({ itemName: "", description: "", hashtags: "", imageUrl: "" });
        setShowCreateForm(false);
      } else {
        const data = await response.json();
        setFormError(data.error || "Failed to create post");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const filteredItems = posts.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hashtags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              <span>Raider</span> Community
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Share and discover lost items with your fellow Texas Tech Raiders
            </p>
          </div>

          {/* Search and Create */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts by item name, description, or hashtags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Post</span>
            </Button>
          </div>

          {/* Create Post Form */}
          {showCreateForm && (
            <Card className="bg-card/50 border-border mb-8">
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
                <CardDescription>Share details about your lost item with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <Alert variant="destructive">
                      <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input
                      id="itemName"
                      name="itemName"
                      type="text"
                      placeholder="e.g., iPhone 13, Red Backpack, Keys"
                      value={formData.itemName}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Provide details about the item, where you lost it, any distinguishing features..."
                      value={formData.description}
                      onChange={handleFormChange}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hashtags">Hashtags</Label>
                    <Input
                      id="hashtags"
                      name="hashtags"
                      type="text"
                      placeholder="e.g., electronics, backpack, keys (comma separated)"
                      value={formData.hashtags}
                      onChange={handleFormChange}
                    />
                    <p className="text-xs text-muted-foreground">Separate multiple hashtags with commas</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Item Image</Label>
                    <ImageUpload onImageUpload={handleImageUpload} currentImage={formData.imageUrl} />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" disabled={formLoading}>
                      {formLoading ? "Creating..." : "Create Post"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Item Cards */}
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? "No items found matching your search." : "No lost items yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item._id} className="bg-card/50 border-border flex flex-col">
                  <CardContent className="p-4 flex flex-col break-words overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.itemName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{item.user.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.studentId}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {item.imageUrl && (
                      <div className="mb-2 overflow-hidden rounded-lg">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.itemName}
                          width={600}
                          height={180}
                          className="rounded-lg object-cover w-full h-36"
                        />
                      </div>
                    )}

                    <p className="text-foreground mb-2 leading-relaxed text-sm">{item.description}</p>

                    {item.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.hashtags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Hash className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {reportedItems[item._id] ? (
                      <Button variant="secondary" size="sm" disabled>
                        Reported at location:{" "}
                        <span className="ml-1 font-mono text-xs">
                          {reportedItems[item._id].latitude.toFixed(4)},{reportedItems[item._id].longitude.toFixed(4)}
                        </span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/report?itemId=" + encodeURIComponent(item._id))}
                      >
                        Report
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
