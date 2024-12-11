import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StoryForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [maleLeadName, setMaleLeadName] = useState("");
  const [maleLeadPersonality, setMaleLeadPersonality] = useState("");
  const [maleLeadAppearance, setMaleLeadAppearance] = useState("");
  const [maleLeadJob, setMaleLeadJob] = useState("");
  const [femaleLeadName, setFemaleLeadName] = useState("");
  const [femaleLeadPersonality, setFemaleLeadPersonality] = useState("");
  const [femaleLeadAppearance, setFemaleLeadAppearance] = useState("");
  const [femaleLeadJob, setFemaleLeadJob] = useState("");
  const [storyPlot, setStoryPlot] = useState("");
  const [storyFantasies, setStoryFantasies] = useState("");
  const [storyGenre, setStoryGenre] = useState("");
  const [chapterLength, setChapterLength] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await fetch(
        "https://nzcfuusuxzdrqfaibgij.supabase.co/functions/v1/generate-story",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData: {
              maleLead: {
                name: maleLeadName,
                personality: maleLeadPersonality,
                appearance: maleLeadAppearance,
                job: maleLeadJob,
              },
              femaleLead: {
                name: femaleLeadName,
                personality: femaleLeadPersonality,
                appearance: femaleLeadAppearance,
                job: femaleLeadJob,
              },
              story: {
                plot: storyPlot,
                fantasy: storyFantasies,
                genre: storyGenre,
                length: chapterLength,
              },
            },
          }),
        }
      ).then((res) => res.json());

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

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Male Lead Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Male Lead</h2>
              <div>
                <Label htmlFor="maleName" className="text-white">
                  Name
                </Label>
                <Input
                  id="maleName"
                  value={maleLeadName}
                  onChange={(e) => setMaleLeadName(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="malePersonality" className="text-white">
                  Personality
                </Label>
                <Textarea
                  id="malePersonality"
                  value={maleLeadPersonality}
                  onChange={(e) => setMaleLeadPersonality(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="maleAppearance" className="text-white">
                  Appearance
                </Label>
                <Textarea
                  id="maleAppearance"
                  value={maleLeadAppearance}
                  onChange={(e) => setMaleLeadAppearance(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="maleJob" className="text-white">
                  Job
                </Label>
                <Input
                  id="maleJob"
                  value={maleLeadJob}
                  onChange={(e) => setMaleLeadJob(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
            </div>

            {/* Female Lead Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Female Lead</h2>
              <div>
                <Label htmlFor="femaleName" className="text-white">
                  Name
                </Label>
                <Input
                  id="femaleName"
                  value={femaleLeadName}
                  onChange={(e) => setFemaleLeadName(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="femalePersonality" className="text-white">
                  Personality
                </Label>
                <Textarea
                  id="femalePersonality"
                  value={femaleLeadPersonality}
                  onChange={(e) => setFemaleLeadPersonality(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="femaleAppearance" className="text-white">
                  Appearance
                </Label>
                <Textarea
                  id="femaleAppearance"
                  value={femaleLeadAppearance}
                  onChange={(e) => setFemaleLeadAppearance(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="femaleJob" className="text-white">
                  Job
                </Label>
                <Input
                  id="femaleJob"
                  value={femaleLeadJob}
                  onChange={(e) => setFemaleLeadJob(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Story Details Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Story Details</h2>
            <div>
              <Label htmlFor="plot" className="text-white">
                Plot
              </Label>
              <Textarea
                id="plot"
                value={storyPlot}
                onChange={(e) => setStoryPlot(e.target.value)}
                className="bg-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="fantasies" className="text-white">
                Fantasies
              </Label>
              <Textarea
                id="fantasies"
                value={storyFantasies}
                onChange={(e) => setStoryFantasies(e.target.value)}
                className="bg-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="genre" className="text-white">
                Genre
              </Label>
              <Select
                value={storyGenre}
                onValueChange={(value) => setStoryGenre(value)}
                required
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="erotica">Erotica</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="length" className="text-white">
                Chapter Length (in words)
              </Label>
              <Select
                value={chapterLength}
                onValueChange={(value) => setChapterLength(value)}
                required
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">500 words</SelectItem>
                  <SelectItem value="1000">1000 words</SelectItem>
                  <SelectItem value="1500">1500 words</SelectItem>
                  <SelectItem value="2000">2000 words</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Generating Story..." : "Generate Story"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StoryForm;