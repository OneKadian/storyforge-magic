import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StoryFormData {
  maleLead: {
    name: string;
    personality: string;
    appearance: string;
    job: string;
  };
  femaleLead: {
    name: string;
    personality: string;
    appearance: string;
    job: string;
  };
  story: {
    plot: string;
    fantasy: string;
    genre: string;
    length: string;
  };
}

export const useStorySubmission = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: StoryFormData) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-story", {
        body: { formData },
      });

      if (error) throw error;

      // Navigate to the read story page with the generated story
      navigate("/read-story", { state: { story: data.story } });
    } catch (error) {
      console.error("Error generating story:", error);
      toast({
        title: "Error",
        description: "Failed to generate story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmit,
  };
};