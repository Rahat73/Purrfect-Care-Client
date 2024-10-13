"use client";

import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { Spacer } from "@nextui-org/spacer";
import { useState } from "react";
import nutritionData from "../../../../../../assets/nutrition-outline.json";
import { FaUndo } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { PDFDownloadLink } from "@react-pdf/renderer";
import NutritionPDF from "@/src/components/nutrition-pdf";

type NutritionOutline = {
  pets: {
    [key: string]: {
      ageGroups: {
        [key: string]: {
          weightRanges: {
            [key: string]: {
              calories: number;
              protein: string;
              fat: string;
              carbs: string;
            };
          };
        };
      };
    };
  };
};

const NutritionCalculator = () => {
  const [petType, setPetType] = useState<string | undefined>(undefined);
  const [ageGroup, setAgeGroup] = useState<string | undefined>(undefined);
  const [weightRange, setWeightRange] = useState<string | undefined>(undefined);
  const [nutritionInfo, setNutritionInfo] = useState<
    | undefined
    | {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      }
  >(undefined);

  const nutritionOutline: NutritionOutline = nutritionData;

  const handlePetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPetType(e.target.value);
    setAgeGroup(undefined);
    setWeightRange(undefined);
    setNutritionInfo(undefined);
  };

  const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeGroup(e.target.value);
    setWeightRange(undefined);
    setNutritionInfo(undefined);
  };

  const handleWeightRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeightRange(e.target.value);
    if (petType && ageGroup && e.target.value) {
      const nutrition =
        nutritionOutline.pets[petType].ageGroups[ageGroup].weightRanges[
          e.target.value
        ];
      setNutritionInfo(nutrition);
    }
  };

  const getAgeGroups = () => {
    if (petType) {
      return Object.keys(nutritionOutline.pets[petType].ageGroups);
    }
    return [];
  };

  const getWeightRanges = () => {
    if (petType && ageGroup) {
      return Object.keys(
        nutritionOutline.pets[petType].ageGroups[ageGroup].weightRanges
      );
    }
    return [];
  };

  return (
    <Card className="w-11/12 max-w-md mx-auto p-3">
      <h1 className="text-2xl font-bold mb-4">Nutrition Ouline</h1>

      {/* Pet Type Selection */}
      <Select
        label="Pet Type"
        placeholder="Select Pet Type"
        fullWidth
        onChange={handlePetTypeChange}
        value={petType}
        size="lg"
      >
        {Object.keys(nutritionOutline.pets).map((pet) => (
          <SelectItem key={pet}>
            {pet.charAt(0).toUpperCase() + pet.slice(1)}
          </SelectItem>
        ))}
      </Select>

      <Spacer y={1.5} />

      {/* Age Group Selection */}
      <Select
        label="Age Group"
        placeholder="Select Age Group"
        fullWidth
        onChange={handleAgeGroupChange}
        value={ageGroup}
        disabled={!petType}
        size="lg"
      >
        {getAgeGroups().map((age) => (
          <SelectItem key={age} value={age}>
            {age.charAt(0).toUpperCase() + age.slice(1)}
          </SelectItem>
        ))}
      </Select>

      <Spacer y={1.5} />

      {/* Weight Range Selection */}
      <Select
        label="Weight Range"
        placeholder="Select Weight Range"
        fullWidth
        onChange={handleWeightRangeChange}
        value={weightRange}
        disabled={!ageGroup}
        size="lg"
      >
        {getWeightRanges().map((weight) => (
          <SelectItem key={weight}>{weight}</SelectItem>
        ))}
      </Select>

      <Spacer y={2} />

      {/* Nutrition Information Display */}
      {nutritionInfo && (
        <Card className="p-3">
          <p>Nutrition Requirements</p>
          <p>Calories: {nutritionInfo?.calories}</p>
          <p>Protein: {nutritionInfo?.protein}</p>
          <p>Fat: {nutritionInfo?.fat}</p>
          <p>Carbohydrates: {nutritionInfo?.carbs}</p>
        </Card>
      )}

      <Spacer y={2} />

      {/* Reset Button */}
      <div className="flex justify-center space-x-5">
        <Button
          color="danger"
          onClick={() => {
            setPetType(undefined);
            setAgeGroup(undefined);
            setWeightRange(undefined);
            setNutritionInfo(undefined);
          }}
        >
          <FaUndo /> Reset
        </Button>

        {nutritionInfo && petType && ageGroup && weightRange && (
          <PDFDownloadLink
            document={
              <NutritionPDF
                petType={petType}
                ageGroup={ageGroup}
                weightRange={weightRange}
                nutritionInfo={nutritionInfo}
              />
            }
            fileName="nutrition-requirements.pdf"
          >
            <Button color="primary">
              <FaFilePdf /> Generate PDF
            </Button>
          </PDFDownloadLink>
        )}
      </div>
    </Card>
  );
};

export default NutritionCalculator;
