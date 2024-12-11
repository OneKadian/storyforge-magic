import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
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
  };
  story: {
    plot: string;
    fantasy: string;
    genre: string;
    length: string;
    title: string;
  };
}

const StoryForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    maleLead: {
      name: '',
      personality: '',
      appearance: '',
      job: '',
    },
    femaleLead: {
      name: '',
      personality: '',
      appearance: '',
    },
    story: {
      plot: '',
      fantasy: '',
      genre: '',
      length: '',
      title: '',
    },
  });

  const handleInputChange = (category: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const isValid = Object.values(formData).every(category => 
      Object.values(category).every(value => 
        typeof value === 'string' && value.trim() !== ''
      )
    );

    if (!isValid) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    toast({
      title: "Creating your story...",
      description: "This might take a minute or two.",
    });

    try {
      const { data, error } = await supabase.functions.invoke('generate-story', {
        body: { formData }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your story has been created.",
      });

      // Here you could redirect to a page showing the generated story
      console.log('Generated story:', data.story);

    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        title: "Error",
        description: "Failed to generate story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-primary-light py-12 px-4">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="text-3xl font-playfair font-bold text-primary-dark mb-8 text-center">
          Create Your Story
        </h1>

        {currentStep === 1 && (
          <div className="step-container">
            <h2 className="text-xl font-playfair font-semibold text-primary mb-6">Male Lead Character</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.maleLead.name}
                  onChange={(e) => handleInputChange('maleLead', 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Personality</label>
                <textarea
                  className="input-field"
                  value={formData.maleLead.personality}
                  onChange={(e) => handleInputChange('maleLead', 'personality', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Appearance</label>
                <textarea
                  className="input-field"
                  value={formData.maleLead.appearance}
                  onChange={(e) => handleInputChange('maleLead', 'appearance', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Job</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.maleLead.job}
                  onChange={(e) => handleInputChange('maleLead', 'job', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-container">
            <h2 className="text-xl font-playfair font-semibold text-primary mb-6">Female Lead Character</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.femaleLead.name}
                  onChange={(e) => handleInputChange('femaleLead', 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Personality</label>
                <textarea
                  className="input-field"
                  value={formData.femaleLead.personality}
                  onChange={(e) => handleInputChange('femaleLead', 'personality', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Appearance</label>
                <textarea
                  className="input-field"
                  value={formData.femaleLead.appearance}
                  onChange={(e) => handleInputChange('femaleLead', 'appearance', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-container">
            <h2 className="text-xl font-playfair font-semibold text-primary mb-6">Story Details</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.story.title}
                  onChange={(e) => handleInputChange('story', 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Plot</label>
                <textarea
                  className="input-field"
                  value={formData.story.plot}
                  onChange={(e) => handleInputChange('story', 'plot', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Fantasy Elements</label>
                <textarea
                  className="input-field"
                  value={formData.story.fantasy}
                  onChange={(e) => handleInputChange('story', 'fantasy', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Genre</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.story.genre}
                  onChange={(e) => handleInputChange('story', 'genre', e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Length (in words)</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.story.length}
                  onChange={(e) => handleInputChange('story', 'length', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors ml-auto disabled:opacity-50"
            >
              {isLoading ? "Creating Story..." : "Create Story"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StoryForm;