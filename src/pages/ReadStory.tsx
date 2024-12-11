import { useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const ReadStory = () => {
  const location = useLocation();
  const { story } = location.state || { story: "" };

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-4 md:p-8">
      <Card className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-xl">
        <ScrollArea className="h-[80vh]">
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-gray-800">
              {story}
            </p>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default ReadStory;