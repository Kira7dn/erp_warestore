/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useActionState } from "react"; // Ensure correct import
import { partValidationSchema } from "@/lib/validation";
import { createPart } from "@/lib/database/actions/parts.action";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const CreatePartForm = ({ type }: { type: string }) => {
  const [errors, setErrors] = useState<
    Record<string, string>
  >({});
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (
    prevState: any,
    formData: FormData
  ) => {
    try {
      const formValues = {
        name: formData.get("name") as string,
        type,
        specification: formData.get(
          "specification"
        ) as string,
        brand: formData.get("brand") as string,
        image: formData.get("image") as string,
        category: formData.get("category") as string,
      };
      await partValidationSchema.parseAsync(formValues);
      const result = await createPart(
        prevState,
        formData,
        type
      );
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
        />

        {errors.specification && (
          <p className="part-form_error">
            {errors.specification}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="brand" className="part-form_label">
          Brand
        </label>
        <Input
          id="brand"
          name="brand"
          className="part-form_input"
          required
          placeholder="Brand"
        />

        {errors.brand && (
          <p className="part-form_error">{errors.brand}</p>
        )}
      </div>
      <div>
        <label htmlFor="image" className="part-form_label">
          Image
        </label>
        <Input
          id="image"
          name="image"
          className="part-form_input"
          placeholder="part Image URL"
        />

        {errors.image && (
          <p className="part-form_error">{errors.image}</p>
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
        />

        {errors.category && (
          <p className="part-form_error">
            {errors.category}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="part-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Part"}
        <Send className="size-4 ml-2" />
      </Button>
    </form>
  );
};

export default CreatePartForm;
