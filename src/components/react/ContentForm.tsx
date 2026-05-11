import React, { useRef } from "react";
import {
  useForm,
  Controller,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { Input } from "./Input";
import { Field } from "./Field";
import { TagsInput } from "./TagsInput";
import { Select } from "./Select";
import { ImageUpload } from "./ImageUpload";
import { Textarea } from "./Textarea";
import { GettingThereSteps } from "./GettingThereSteps";
import { QuickFacts } from "./QuickFacts";
import { GalleryUpload, type GalleryItem } from "./GalleryUpload";
import { FileText, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type ContentStatus = "draft" | "published";
type FoodTypeEnum = "local" | "street" | "restaurant" | "seafood" | "dessert";

export interface MediaItem {
  url: string;
  alt?: string;
  caption?: string;
  order?: number;
}

interface BaseContentFields {
  name: string;
  slug: string;
  short_description: string;
  body: string;
  tags: string[];
  status: ContentStatus;
  main_image: MediaItem | null;
  gallery_images: MediaItem[];
  district_id?: string;
}

export interface DistrictFormData extends BaseContentFields {
  tagline: string;
  getting_there_steps: string[];
  display_order: number;
  quick_facts: Record<string, string>;
}

export interface MunicipalityFormData extends BaseContentFields {
  district_id: string;
}

export interface AttractionFormData extends BaseContentFields {
  municipality_id: string;
}

export interface FoodFormData extends BaseContentFields {
  municipality_id: string;
  food_type: FoodTypeEnum;
}

export interface FestivalFormData extends BaseContentFields {
  municipality_id: string;
  date: string;
}

export interface EventFormData extends BaseContentFields {
  municipality_id: string;
  date: string;
  end_date: string;
  venue: string;
}

type ContentFormData =
  | DistrictFormData
  | MunicipalityFormData
  | AttractionFormData
  | FoodFormData
  | FestivalFormData
  | EventFormData;

interface ContentFormProps {
  initialData?: Partial<ContentFormData>;
  type: string;
  onSave: (data: ContentFormData) => void;
  onCancel: () => void;
  districts: { id: string | number; name: string }[];
  municipalities: {
    id: string | number;
    name: string;
    district_id: string | number;
  }[];
}

const autoSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[10px] font-extrabold tracking-[0.14em] text-admin-secondary uppercase mb-4 pb-2 border-b border-admin-border">
    {children}
  </div>
);

function getDefaults(type: string): ContentFormData {
  const base: BaseContentFields = {
    name: "",
    slug: "",
    short_description: "",
    body: "",
    tags: [],
    status: "draft",
    main_image: null,
    gallery_images: [],
  };

  switch (type) {
    case "district":
      return { ...base, tagline: "", getting_there_steps: [], display_order: 1, quick_facts: {} } as DistrictFormData;
    case "municipality":
      return { ...base, district_id: "" } as MunicipalityFormData;
    case "attractions":
      return { ...base, municipality_id: "" } as AttractionFormData;
    case "foods":
      return { ...base, municipality_id: "", food_type: "local" } as FoodFormData;
    case "festivals":
      return { ...base, municipality_id: "", date: "" } as FestivalFormData;
    case "events":
      return { ...base, municipality_id: "", date: "", end_date: "", venue: "" } as EventFormData;
    default:
      return { ...base, district_id: "" } as MunicipalityFormData;
  }
}


function StatusBanner({
  status,
  onUnpublish,
}: {
  status: ContentStatus;
  onUnpublish: () => void;
}) {
  const isPublished = status === "published";
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#130f08] border border-admin-border text-[12px] mb-6">
      <span className={cn(
        "w-1.5 h-1.5 rounded-full shrink-0",
        isPublished ? "bg-emerald-400" : "bg-[#3e3020]"
      )} />
      <span className="text-admin-secondary">
        Currently{" "}
        <span className={cn(
          "font-semibold",
          isPublished ? "text-emerald-400" : "text-admin-secondary"
        )}>
          {isPublished ? "published" : "draft"}
        </span>
      </span>
      {isPublished && (
        <button
          type="button"
          onClick={onUnpublish}
          className="ml-auto text-[11px] text-admin-secondary hover:text-amber-500 transition-colors"
        >
          Unpublish
        </button>
      )}
    </div>
  );
}


export default function ContentForm({
  initialData = {},
  type,
  onSave,
  onCancel,
  districts = [],
  municipalities = [],
}: ContentFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContentFormData>({
    defaultValues: { ...getDefaults(type), ...initialData },
  });

  const selectedDistrictId = useWatch({ control, name: "district_id" });

  const saveAs = (status: ContentStatus): SubmitHandler<ContentFormData> =>
    (data) => onSave({ ...data, status });

  const handleSaveDraft = handleSubmit(saveAs("draft"));
  const handlePublish = handleSubmit(saveAs("published"));
  const handleUnpublish = handleSubmit(saveAs("draft"));

  const isCurrentlyPublished = initialData?.status === "published";
  const slugManuallyEdited = useRef(!!initialData?.slug);

  return (
    <div className="flex flex-col gap-6">

      {initialData?.status && (
        <StatusBanner
          status={initialData.status}
          onUnpublish={handleUnpublish}
        />
      )}

      <section>
        <SectionHeader>Core Information</SectionHeader>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field label="Name" required error={errors.name?.message}>
            <Input
              {...register("name", {
                required: "Name is required",
                onChange: (e) => {
                  if (!slugManuallyEdited.current) {
                    setValue("slug", autoSlug(e.target.value));
                  }
                },
              })}
              placeholder="e.g. Miagao Church"
            />
          </Field>
          <Field label="Slug" hint="Auto-generated from name — used in URLs">
            <Input
              {...register("slug", {
                onChange: () => {
                  slugManuallyEdited.current = true;
                },
              })}
              placeholder="e.g. miagao-church"
            />
          </Field>
        </div>
        <Field label="Short Description" required error={errors.short_description?.message}>
          <Textarea
            {...register("short_description", { required: "Short description is required" })}
            placeholder="Brief summary shown on cards and listings..."
            rows={2}
          />
        </Field>
      </section>

      {type === "district" && (
        <section>
          <SectionHeader>District Details</SectionHeader>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Field label="Tagline">
              <Input
                {...register("tagline" as keyof ContentFormData)}
                placeholder="e.g. The City of Love"
              />
            </Field>
            <Field label="Display Order">
              <Input
                type="number"
                {...register("display_order" as keyof ContentFormData, { valueAsNumber: true })}
              />
            </Field>
          </div>
          <div className="mb-4">
            <Field label="Getting There Steps" hint="Add each step in order">
              <Controller
                control={control}
                name={"getting_there_steps" as keyof ContentFormData}
                render={({ field }) => (
                  <GettingThereSteps
                    value={(field.value as string[]) ?? []}
                    onChange={field.onChange}
                  />
                )}
              />
            </Field>
          </div>
          <Field label="Quick Facts" hint="Key-value pairs shown on the district page">
            <Controller
              control={control}
              name={"quick_facts" as keyof ContentFormData}
              render={({ field }) => (
                <QuickFacts
                  value={(field.value as unknown as Record<string, string>) ?? {}}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
        </section>
      )}

      {/* ── Municipality Details ── */}
      {type === "municipality" && (
        <section>
          <SectionHeader>Municipality Details</SectionHeader>
          <Field label="District" required>
            <Controller
              control={control}
              name="district_id"
              rules={{ required: "Please select a district" }}
              render={({ field }) => (
                <Select
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Select a district..."
                  options={districts.map((d) => ({ value: String(d.id), label: d.name }))}
                />
              )}
            />
          </Field>
        </section>
      )}

      {/* ── Location ── */}
      {["attractions", "foods", "festivals", "events"].includes(type) && (
        <section>
          <SectionHeader>Location</SectionHeader>
          <Field label="Municipality" required>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="district_id"
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onChange={(v) => {
                      field.onChange(v);
                      setValue("municipality_id" as keyof ContentFormData, "" as any);
                    }}
                    placeholder="First select district..."
                    options={districts.map((d) => ({ value: String(d.id), label: d.name }))}
                  />
                )}
              />
              <Controller
                control={control}
                name={"municipality_id" as keyof ContentFormData}
                rules={{ required: "Please select a municipality" }}
                render={({ field }) => (
                  <Select
                    value={(field.value as string) ?? ""}
                    onChange={field.onChange}
                    placeholder="Select municipality..."
                    options={municipalities
                      .filter((m) =>
                        !selectedDistrictId ||
                        String(m.district_id) === String(selectedDistrictId)
                      )
                      .map((m) => ({ value: String(m.id), label: m.name }))}
                  />
                )}
              />
            </div>
          </Field>
        </section>
      )}

      {/* ── Food Details ── */}
      {type === "foods" && (
        <section>
          <SectionHeader>Food Details</SectionHeader>
          <Field label="Food Type">
            <Controller
              control={control}
              name={"food_type" as keyof ContentFormData}
              render={({ field }) => (
                <Select
                  value={(field.value as string) ?? "local"}
                  onChange={field.onChange}
                  options={(["local", "street", "restaurant", "seafood", "dessert"] as const).map(
                    (t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) })
                  )}
                />
              )}
            />
          </Field>
        </section>
      )}

      {/* ── Date & Venue ── */}
      {(type === "festivals" || type === "events") && (
        <section>
          <SectionHeader>Date & Venue</SectionHeader>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date" required>
              <Input
                type="date"
                {...register("date" as keyof ContentFormData, { required: "Date is required" })}
              />
            </Field>
            {type === "events" && (
              <>
                <Field label="End Date">
                  <Input type="date" {...register("end_date" as keyof ContentFormData)} />
                </Field>
                <Field label="Venue">
                  <Input
                    {...register("venue" as keyof ContentFormData)}
                    placeholder="e.g. Iloilo Convention Center"
                  />
                </Field>
              </>
            )}
          </div>
        </section>
      )}

      {/* ── Media ── */}
      <section>
        <SectionHeader>Media</SectionHeader>
        <div className="flex flex-col gap-6">
          <Field label="Main Image" hint="Primary image shown on cards and the detail page header" required>
            <Controller
              control={control}
              name="main_image"
              render={({ field }) => (
                <ImageUpload value={field.value} onChange={field.onChange} />
              )}
            />
          </Field>
          <Field label="Gallery" hint="Additional images — hover a thumbnail to add a caption or remove it">
            <Controller
              control={control}
              name="gallery_images"
              render={({ field }) => (
                <GalleryUpload
                  value={(field.value as GalleryItem[]) ?? []}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
        </div>
      </section>

      {/* ── Full Content ── */}
      <section>
        <SectionHeader>Full Content</SectionHeader>
        <Field label="Body" hint="Supports plain text. Markdown rendering coming soon.">
          <Textarea
            {...register("body")}
            placeholder="Write detailed content here..."
            rows={8}
          />
        </Field>
      </section>

      {/* ── Tags ── */}
      <section>
        <SectionHeader>Tags</SectionHeader>
        <Field label="Tags" hint="Press Add or Enter to add each tag">
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <TagsInput value={field.value} onChange={field.onChange} />
            )}
          />
        </Field>
      </section>

      {/* ── Footer ── */}
      <div className="flex gap-2.5 pt-2 border-t border-admin-border">
        <button
          type="button"
          onClick={handleSaveDraft}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-admin-input bg-transparent text-admin-primary font-semibold text-[13px] cursor-pointer hover:bg-admin-border transition-colors"
        >
          <FileText size={13} />
          Save as Draft
        </button>

        <button
          type="button"
          onClick={handlePublish}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#1a1208] font-bold text-[13px] cursor-pointer transition-colors"
        >
          <Globe size={13} />
          {isCurrentlyPublished ? "Update & Keep Published" : "Publish"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="ml-auto px-5 py-2.5 rounded-lg bg-transparent text-admin-secondary text-[13px] cursor-pointer hover:text-white/80 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
