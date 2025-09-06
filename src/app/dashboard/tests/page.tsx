"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function TestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedTest, setSelectedTest] = useState<any>(null);
  
  const [testCatalog] = useState([
    {
      id: "TST001",
      name: "Complete Blood Count (CBC)",
      category: "Hematology",
      description: "Measures different components and features of blood",
      sampleType: "Blood",
      turnaroundTime: "2-4 hours",
      price: 45.00,
      isActive: true,
      methodology: "Automated Cell Counter",
      normalRanges: {
        "WBC": "4.5-11.0 x10³/μL",
        "RBC": "4.5-5.5 x10⁶/μL",
        "Hemoglobin": "12-16 g/dL",
        "Hematocrit": "36-46%"
      }
    },
    {
      id: "TST002", 
      name: "Lipid Profile",
      category: "Clinical Chemistry",
      description: "Measures cholesterol and triglyceride levels",
      sampleType: "Blood",
      turnaroundTime: "4-6 hours",
      price: 65.00,
      isActive: true,
      methodology: "Enzymatic Colorimetry",
      normalRanges: {
        "Total Cholesterol": "<200 mg/dL",
        "HDL Cholesterol": ">40 mg/dL (M), >50 mg/dL (F)",
        "LDL Cholesterol": "<100 mg/dL",
        "Triglycerides": "<150 mg/dL"
      }
    },
    {
      id: "TST003",
      name: "Liver Function Test (LFT)",
      category: "Clinical Chemistry", 
      description: "Assesses liver health and function",
      sampleType: "Blood",
      turnaroundTime: "4-8 hours",
      price: 85.00,
      isActive: true,
      methodology: "Spectrophotometry",
      normalRanges: {
        "ALT": "7-45 U/L",
        "AST": "8-40 U/L", 
        "ALP": "44-147 U/L",
        "Total Bilirubin": "0.2-1.2 mg/dL"
      }
    },
    {
      id: "TST004",
      name: "Urinalysis",
      category: "Clinical Microscopy",
      description: "Complete analysis of urine sample",
      sampleType: "Urine",
      turnaroundTime: "1-2 hours",
      price: 35.00,
      isActive: true,
      methodology: "Automated Urinalysis",
      normalRanges: {
        "Color": "Light yellow",
        "Clarity": "Clear",
        "Specific Gravity": "1.005-1.030",
        "pH": "4.6-8.0"
      }
    },
    {
      id: "TST005",
      name: "HbA1c (Glycated Hemoglobin)",
      category: "Clinical Chemistry",
      description: "Long-term blood glucose control indicator",
      sampleType: "Blood", 
      turnaroundTime: "2-4 hours",
      price: 55.00,
      isActive: true,
      methodology: "HPLC",
      normalRanges: {
        "HbA1c": "<5.7% (Normal), 5.7-6.4% (Prediabetes), ≥6.5% (Diabetes)"
      }
    },
    {
      id: "TST006",
      name: "Thyroid Function Test",
      category: "Endocrinology",
      description: "Evaluates thyroid gland function",
      sampleType: "Blood",
      turnaroundTime: "6-8 hours", 
      price: 120.00,
      isActive: true,
      methodology: "Chemiluminescent Immunoassay",
      normalRanges: {
        "TSH": "0.4-4.0 mIU/L",
        "Free T4": "0.8-1.8 ng/dL",
        "Free T3": "2.3-4.2 pg/mL"
      }
    },
    {
      id: "TST007",
      name: "C-Reactive Protein (CRP)",
      category: "Immunology",
      description: "Marker of inflammation and infection",
      sampleType: "Blood",
      turnaroundTime: "2-3 hours",
      price: 40.00,
      isActive: false,
      methodology: "Turbidimetry",
      normalRanges: {
        "CRP": "<3.0 mg/L"
      }
    }
  ]);

  const filteredTests = testCatalog.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterCategory === "all" || test.category === filterCategory;
    
    return matchesSearch && matchesFilter;
  });

  const categories = [...new Set(testCatalog.map(test => test.category))];

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      "Hematology": "bg-red-100 text-red-800",
      "Clinical Chemistry": "bg-blue-100 text-blue-800",
      "Clinical Microscopy": "bg-green-100 text-green-800",
      "Endocrinology": "bg-purple-100 text-purple-800",
      "Immunology": "bg-yellow-100 text-yellow-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getSampleTypeIcon = (sampleType: string) => {
    switch (sampleType.toLowerCase()) {
      case "blood":
        return (
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        );
      case "urine":
        return (
          <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Management</h1>
          <p className="text-gray-600 mt-1">Manage test catalog and configure testing parameters</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Import Tests
          </Button>
          <Button>
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Test
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900">{testCatalog.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Tests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {testCatalog.filter(t => t.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(testCatalog.reduce((sum, t) => sum + t.price, 0) / testCatalog.length).toFixed(0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <Input
                  type="search"
                  placeholder="Search tests by name, ID, or category..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Test Catalog ({filteredTests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sample</TableHead>
                <TableHead>Turnaround</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{test.name}</p>
                      <p className="text-sm text-gray-500">{test.id}</p>
                      <p className="text-sm text-gray-500">{test.methodology}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryBadgeColor(test.category)}>
                      {test.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getSampleTypeIcon(test.sampleType)}
                      <span className="text-sm">{test.sampleType}</span>
                    </div>
                  </TableCell>
                  <TableCell>{test.turnaroundTime}</TableCell>
                  <TableCell className="font-medium">${test.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {test.isActive ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedTest(test)}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{selectedTest?.name}</DialogTitle>
                            <DialogDescription>
                              {selectedTest?.description}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTest && (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div>
                                <h4 className="font-semibold mb-2">Test Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Test ID:</span>
                                    <span>{selectedTest.id}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Category:</span>
                                    <Badge className={getCategoryBadgeColor(selectedTest.category)}>
                                      {selectedTest.category}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Sample Type:</span>
                                    <span>{selectedTest.sampleType}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Methodology:</span>
                                    <span>{selectedTest.methodology}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Turnaround:</span>
                                    <span>{selectedTest.turnaroundTime}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Price:</span>
                                    <span className="font-semibold">${selectedTest.price.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Normal Ranges</h4>
                                <div className="space-y-2 text-sm">
                                  {Object.entries(selectedTest.normalRanges).map(([parameter, range]) => (
                                    <div key={parameter} className="flex justify-between">
                                      <span className="text-gray-600">{parameter}:</span>
                                      <span className="text-right">{range}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}