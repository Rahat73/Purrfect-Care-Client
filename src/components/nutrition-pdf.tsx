import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const NutritionPDF = ({
  petType,
  ageGroup,
  weightRange,
  nutritionInfo,
}: {
  petType: string;
  ageGroup: string;
  weightRange: string;
  nutritionInfo: {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
  };
}) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    section: {
      margin: 10,
      padding: 10,
    },
    header: {
      fontSize: 18,
      marginBottom: 10,
    },
    info: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  return (
    <Document>
      <Page style={styles.page} size="A5">
        <View>
          <Text style={{ ...styles.header, textAlign: "center", fontSize: 24 }}>
            Purrfect Care
          </Text>
        </View>
        <View>
          <Text style={{ ...styles.header, textAlign: "center" }}>
            Recommended Daily Nutrition Requirements
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Pet Information</Text>
          <Text style={styles.info}>Pet Type: {petType}</Text>
          <Text style={styles.info}>Age Group: {ageGroup}</Text>
          <Text style={styles.info}>Weight Range: {weightRange}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Nutrition Requirements</Text>
          <Text style={styles.info}>Calories: {nutritionInfo.calories}</Text>
          <Text style={styles.info}>Protein: {nutritionInfo.protein}</Text>
          <Text style={styles.info}>Fat: {nutritionInfo.fat}</Text>
          <Text style={styles.info}>Carbohydrates: {nutritionInfo.carbs}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default NutritionPDF;
