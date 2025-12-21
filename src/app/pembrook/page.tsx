"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  DollarSign,
  TrendingUp,
  FileText,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Lightbulb,
  Landmark,
  Home,
  Eye,
} from "lucide-react";

// Property data
const propertyUnits = [
  {
    address: "9132 Pembrook St",
    type: "Primary Residence",
    sqft: "1,800",
    beds: 3,
    baths: 4,
    status: "Renovation In Progress",
    appraisedValue: "$440,000",
  },
  {
    address: "9134 Pembrook St",
    type: "Accessory Dwelling Unit",
    sqft: "2,796",
    beds: 3,
    baths: 4,
    status: "Renovation In Progress",
    appraisedValue: "$315,000",
  },
  {
    address: "9136 Pembrook St",
    type: "Accessory Dwelling Unit",
    sqft: "2,796",
    beds: 3,
    baths: 4,
    status: "Renovation In Progress",
    appraisedValue: "$280,000",
  },
];

const capitalStructure = [
  {
    label: "Senior Debt",
    source: "Center Street Lending",
    amount: "$550,000",
    percentage: 50,
  },
  {
    label: "Mezzanine",
    source: "Private Investors",
    amount: "$500,000",
    percentage: 46,
  },
  {
    label: "Interest Reserve",
    source: "Accrued Interest",
    amount: "$45,000",
    percentage: 4,
  },
];

const constructionTimeline = [
  {
    phase: "Acquisition & Planning",
    status: "completed",
    date: "Q2 2024",
    details: "Property acquired, plans approved by City of Houston",
  },
  {
    phase: "Foundation & Structural",
    status: "completed",
    date: "Q3 2024",
    details: "Foundation work and structural reinforcement complete",
  },
  {
    phase: "MEP Rough-In",
    status: "completed",
    date: "Q4 2024",
    details: "Electrical, plumbing, and HVAC rough-in complete",
  },
  {
    phase: "Interior Finishing",
    status: "in-progress",
    date: "Q1 2025",
    details: "Drywall, flooring, cabinetry, and fixtures",
  },
  {
    phase: "Final Inspection & CO",
    status: "upcoming",
    date: "Q1 2025",
    details: "City inspection and Certificate of Occupancy",
  },
];

const campusVision = [
  {
    icon: GraduationCap,
    title: "Institute Headquarters",
    description:
      "Primary location for Institute for AI Innovation training programs, serving workforce development in the Greater Houston area.",
    color: "blue",
  },
  {
    icon: Lightbulb,
    title: "Tech Incubator",
    description:
      "Dedicated space for BrandVoice.studio operations and emerging AI ventures, fostering innovation and entrepreneurship.",
    color: "purple",
  },
  {
    icon: Landmark,
    title: "Investment Collateral",
    description:
      "Real property backing for Eula Properties investment offerings, providing tangible asset security for investors.",
    color: "green",
  },
];

const documents = [
  {
    title: "9132 Pembrook Appraisal",
    description: "Full appraisal report for primary residence",
    file: "/pembrook/documents/appraisal-9132.pdf",
    type: "appraisal",
  },
  {
    title: "9134 Pembrook Appraisal",
    description: "Full appraisal report for ADU #1",
    file: "/pembrook/documents/appraisal-9134.pdf",
    type: "appraisal",
  },
  {
    title: "9136 Pembrook Appraisal",
    description: "Full appraisal report for ADU #2",
    file: "/pembrook/documents/appraisal-9136.pdf",
    type: "appraisal",
  },
  {
    title: "Approved Construction Plans",
    description: "City of Houston approved architectural plans",
    file: "/pembrook/documents/approved-plans.pdf",
    type: "permit",
  },
];

const galleryImages = [
  // Stage 1: Framing
  { src: "/pembrook/images/IMG_0090.jpeg", category: "framing", title: "Framing Stage" },
  // Stage 2: Siding & Exterior
  { src: "/pembrook/images/IMG_7769.jpeg", category: "siding", title: "Siding Complete" },
  { src: "/pembrook/images/IMG_7770.jpeg", category: "siding", title: "Exterior Progress" },
  // Stage 3: Permits & Documentation
  { src: "/pembrook/images/IMG_9725.jpeg", category: "docs", title: "Building Permit" },
  // Stage 4: Finished Renders
  { src: "/pembrook/images/Render.jpg", category: "render", title: "Exterior Render" },
  { src: "/pembrook/images/whatsapp-1.jpeg", category: "render", title: "Bedroom Render 1" },
  { src: "/pembrook/images/whatsapp-2.jpeg", category: "render", title: "Interior Render" },
  { src: "/pembrook/images/whatsapp-3.jpeg", category: "render", title: "Bedroom Render 2" },
  { src: "/pembrook/images/whatsapp-4.jpeg", category: "render", title: "Living Room Render" },
  { src: "/pembrook/images/whatsapp-5.jpeg", category: "render", title: "Interior Render 2" },
  { src: "/pembrook/images/whatsapp-6.jpeg", category: "render", title: "Interior Render 3" },
  { src: "/pembrook/images/whatsapp-7.jpeg", category: "render", title: "Kitchen Render" },
  { src: "/pembrook/images/whatsapp-8.jpeg", category: "render", title: "Interior Render 4" },
  { src: "/pembrook/images/whatsapp-9.jpeg", category: "render", title: "Interior Render 5" },
  { src: "/pembrook/images/whatsapp-10.jpeg", category: "render", title: "Interior Render 6" },
];

export default function PembrookInvestorPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);

  const filteredImages =
    galleryFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === galleryFilter);

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(
      (_, i) => i === selectedImage
    );
    if (direction === "prev") {
      setSelectedImage(
        currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
      );
    } else {
      setSelectedImage(
        currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
      );
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/pembrook/images/Render.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">
                  70% Complete
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Pembrook
                <br />
                <span className="text-emerald-400">3-Unit Compound</span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 max-w-xl">
                Applied AI. Real Assets. Real Impact.
              </p>

              <div className="flex items-center gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>Houston, TX 77016</span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  $1.095M
                </div>
                <div className="text-slate-400 text-sm">Total Capital Stack</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  $1.035M
                </div>
                <div className="text-slate-400 text-sm">
                  Combined Appraised Value
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  3
                </div>
                <div className="text-slate-400 text-sm">Separate Units</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  7,392
                </div>
                <div className="text-slate-400 text-sm">Total Sq Ft</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Thesis */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Investment Thesis
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="prose prose-lg max-w-none text-slate-700">
              <p>
                The Pembrook compound represents a strategic real estate
                investment combining workforce development infrastructure with
                tangible asset backing. This 3-unit property in Houston&apos;s
                growing 77016 corridor serves as the operational headquarters
                for the Institute for AI Innovation while providing investors
                with real property collateral.
              </p>
              <p>
                The renovation transforms an underutilized property into a
                purpose-built campus supporting AI workforce training, tech
                incubation, and investment operations. Upon completion, the
                property will house training facilities, office space, and
                meeting areas while maintaining its residential character.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capital Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Capital Structure
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {capitalStructure.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.percentage}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {item.amount}
                </div>
                <div className="text-sm text-slate-500">{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Construction Timeline
          </h2>
          <div className="space-y-4">
            {constructionTimeline.map((phase, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md p-6 flex items-start gap-4 ${
                  phase.status === "in-progress"
                    ? "ring-2 ring-emerald-500"
                    : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    phase.status === "completed"
                      ? "bg-emerald-500 text-white"
                      : phase.status === "in-progress"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {phase.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : phase.status === "in-progress" ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <Calendar className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-900">
                      {phase.phase}
                    </h3>
                    <span className="text-sm text-slate-500">{phase.date}</span>
                  </div>
                  <p className="text-slate-600">{phase.details}</p>
                  {phase.status === "in-progress" && (
                    <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Currently Active
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Campus Vision: Three Core Functions
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            The Pembrook compound is designed to serve multiple strategic purposes,
            maximizing value and impact for investors and the community.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {campusVision.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    item.color === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : item.color === "purple"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Units */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Property Units
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {propertyUnits.map((unit) => (
              <div
                key={unit.address}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-emerald-600 text-white px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    <span className="font-semibold">{unit.address}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-4">{unit.type}</div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">
                        {unit.sqft}
                      </div>
                      <div className="text-xs text-slate-500">Sq Ft</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">
                        {unit.beds}
                      </div>
                      <div className="text-xs text-slate-500">Beds</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">
                        {unit.baths}
                      </div>
                      <div className="text-xs text-slate-500">Baths</div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        Appraised Value
                      </span>
                      <span className="font-bold text-emerald-600">
                        {unit.appraisedValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tour */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Video Tour
          </h2>
          <div
            className="relative aspect-video max-w-4xl mx-auto bg-slate-900 rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setShowVideoModal(true)}
          >
            <Image
              src="/pembrook/images/Render.jpg"
              alt="Video thumbnail"
              fill
              className="object-cover opacity-70 group-hover:opacity-50 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Property Gallery
          </h2>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {["all", "framing", "siding", "render"].map((filter) => (
              <button
                key={filter}
                onClick={() => setGalleryFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  galleryFilter === filter
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {filter === "all"
                  ? "All Photos"
                  : filter === "framing"
                  ? "Framing"
                  : filter === "siding"
                  ? "Siding & Exterior"
                  : "Interior Renders"}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    {image.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Vault */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Document Vault
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">{doc.description}</p>
                  <button
                    onClick={() => setViewingDocument(doc.file)}
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View Document
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Learning More?</h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Contact us for detailed investment information and partnership
            opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:dbutler@eulaproperties.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              <DollarSign className="w-5 h-5" />
              Contact Investor Relations
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-4 right-4 text-white hover:text-slate-300"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
            className="absolute left-4 text-white hover:text-slate-300"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
            <Image
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].title}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
            className="absolute right-4 text-white hover:text-slate-300"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="font-medium">{filteredImages[selectedImage].title}</p>
            <p className="text-sm text-slate-400">
              {selectedImage + 1} / {filteredImages.length}
            </p>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-4 right-4 text-white hover:text-slate-300"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setViewingDocument(null)}
        >
          <button
            onClick={() => setViewingDocument(null)}
            className="absolute top-4 right-4 text-white hover:text-slate-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="w-full max-w-5xl h-[85vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={viewingDocument}
              className="w-full h-full"
              title="Document Viewer"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Eula Properties LLC. All rights
            reserved.
          </p>
          <p className="text-sm">
            9132-9136 Pembrook St, Houston, TX 77016
          </p>
        </div>
      </footer>
    </main>
  );
}
