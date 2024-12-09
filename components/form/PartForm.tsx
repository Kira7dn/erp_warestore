"use client";
import React, { useState } from "react";
import { useActionState } from "react";
import { partValidationSchema } from "@/lib/validation";
import {
  createPart,
  updatePart,
} from "@/lib/database/actions/parts.action";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { SingleImageDropzone } from "../SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { resizeImage } from "@/lib/utils";

type FormProps = {
  type: PartType;
  action: "create" | "update";
  data?: PartDataType;
};
const PartForm = ({ type, action, data }: FormProps) => {
  const [errors, setErrors] = useState<
    Record<string, string>
  >({});
  const { toast } = useToast();
  const router = useRouter();
  const [file, setFile] = useState<
    File | string | undefined
  >(data?.image || undefined);
  const { edgestore } = useEdgeStore();
  const uploadImage = async (uploadfile: File) => {
    if (uploadfile instanceof File) {
      const resizedFile = (await resizeImage(
        uploadfile,
        800,
        800
      )) as File; // Resize to max 800x800
      const res = await edgestore.publicFiles.upload({
        file: resizedFile,
      });
      return res.url;
    }
    return file as string;
  };

  const initialFormValues = {
    name: data?.name || "",
    specification: data?.specification || "",
    brand: data?.brand || "",
    category: data?.category || "",
  };

  const handleFormSubmit = async (
    prevState: { error: string; status: string },
    formData: FormData
  ) => {
    const imageUrl = await uploadImage(file as File);
    try {
      const formValues =
        action === "update"
          ? {
              _id: data?._id,
              id: data?.id,
              name: formData.get("name") as string,
              type,
              specification: formData.get(
                "specification"
              ) as string,
              brand: formData.get("brand") as string,
              image: imageUrl,
              category: formData.get("category") as string,
            }
          : {
              name: formData.get("name") as string,
              type,
              specification: formData.get(
                "specification"
              ) as string,
              brand: formData.get("brand") as string,
              image: imageUrl,
              category: formData.get("category") as string,
            };
      await partValidationSchema.parseAsync(formValues);
      const result =
        action === "update"
          ? await updatePart(formValues)
          : await createPart(formValues);
      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description:
            "Your startup pitch has been created successfully",
        });
        router.push(`/${result.type}/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;
        setErrors(
          fieldErorrs as unknown as Record<string, string>
        );
        toast({
          title: "Error",
          description:
            "Please check your inputs and try again",
          variant: "destructive",
        });

        return {
          ...prevState,
          error: "Validation failed",
          status: "ERROR",
        };
      }
      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    {
      error: "",
      status: "INITIAL",
    }
  );

  return (
    <form action={formAction} className="part-form">
      <div>
        <label htmlFor="image" className="part-form_label">
          Image
        </label>
        <SingleImageDropzone
          width={200}
          height={200}
          className="mx-auto mt-4 w-full"
          value={file}
          onChange={(file) => {
            setFile(file);
          }}
        />
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <label
            htmlFor="part_name"
            className="part-form_label"
          >
            Part Name
          </label>
          <Input
            id="part_name"
            name="name"
            className="part-form_input"
            required
            placeholder="Part Name"
            defaultValue={initialFormValues.name}
          />

          {errors.name && (
            <p className="part-form_error">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="specification"
            className="part-form_label"
          >
            Specification
          </label>
          <Input
            id="specification"
            name="specification"
            className="part-form_input"
            required
            placeholder="Part Description"
            defaultValue={initialFormValues.specification}
          />

          {errors.specification && (
            <p className="part-form_error">
              {errors.specification}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="brand"
            className="part-form_label"
          >
            Brand
          </label>
          <Input
            id="brand"
            name="brand"
            className="part-form_input"
            required
            placeholder="Brand"
            defaultValue={initialFormValues.brand}
          />

          {errors.brand && (
            <p className="part-form_error">
              {errors.brand}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="part-form_label"
          >
            Category
          </label>
          <Input
            id="category"
            name="category"
            className="part-form_input"
            required
            placeholder="part Category (Tech, Health, Education...)"
            defaultValue={initialFormValues.category}
          />

          {errors.category && (
            <p className="part-form_error">
              {errors.category}
            </p>
          )}
        </div>
        <div className="w-full flex items-center justify-center">
          <Button
            type="submit"
            className="part-form_btn "
            disabled={isPending}
          >
            {isPending ? "Submitting..." : `${action} Part`}
            <Send className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PartForm;
