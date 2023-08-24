"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import Modal from "./Modal";
import Input from "../inputs/Input";

import ImageUpload from "../inputs/ImageUpload";
import useBlogModal from "@/app/hooks/useBlogModal";
import Heading from "../shared/Heading";
import Description from "../inputs/Description";

enum STEPS {
  TITLE = 0,
  DESCRIPTION = 1,
  IMAGES = 2,
}

const RentModal = () => {
  const router = useRouter();
  const blogModal = useBlogModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.DESCRIPTION);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      imageSrc: "",
      title: "",
      description: "",
    },
  });

  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.IMAGES) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        blogModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.TITLE) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your content"
        subtitle="Its Always Good!"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      ></div>
    </div>
  );

  if (step === STEPS.TITLE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="What is Your Best Title" subtitle="Hmmm!" />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          required
        />
        <hr />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          required
        />
        <Description
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          required
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a Photo"
          subtitle="One Picture is Worth 1000 Words!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={blogModal.isOpen}
      title="Readers At your Blog!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.DESCRIPTION ? undefined : onBack}
      onClose={blogModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
