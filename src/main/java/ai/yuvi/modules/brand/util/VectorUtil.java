package ai.yuvi.modules.brand.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class VectorUtil {
    
    public static double cosineSimilarity(List<Double> vec1, List<Double> vec2) {
        if (vec1.size() != vec2.size()) {
            throw new IllegalArgumentException("Vectors must be of equal length");
        }

        double dotProduct = 0.0;
        double norm1 = 0.0;
        double norm2 = 0.0;

        for (int i = 0; i < vec1.size(); i++) {
            dotProduct += vec1.get(i) * vec2.get(i);
            norm1 += vec1.get(i) * vec1.get(i);
            norm2 += vec2.get(i) * vec2.get(i);
        }

        if (norm1 == 0.0 || norm2 == 0.0) {
            return 0.0;
        }

        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }

    public static List<Double> normalize(List<Double> vector) {
        double sumOfSquares = 0.0;
        for (double value : vector) {
            sumOfSquares += value * value;
        }
        
        double magnitude = Math.sqrt(sumOfSquares);
        if (magnitude == 0.0) {
            return new ArrayList<>(vector);
        }

        List<Double> normalized = new ArrayList<>(vector.size());
        for (double value : vector) {
            normalized.add(value / magnitude);
        }
        
        return normalized;
    }

    public static List<Double> add(List<Double> vec1, List<Double> vec2) {
        if (vec1.size() != vec2.size()) {
            throw new IllegalArgumentException("Vectors must be of equal length");
        }

        List<Double> result = new ArrayList<>(vec1.size());
        for (int i = 0; i < vec1.size(); i++) {
            result.add(vec1.get(i) + vec2.get(i));
        }
        
        return result;
    }

    public static List<Double> subtract(List<Double> vec1, List<Double> vec2) {
        if (vec1.size() != vec2.size()) {
            throw new IllegalArgumentException("Vectors must be of equal length");
        }

        List<Double> result = new ArrayList<>(vec1.size());
        for (int i = 0; i < vec1.size(); i++) {
            result.add(vec1.get(i) - vec2.get(i));
        }
        
        return result;
    }

    public static List<Double> multiply(List<Double> vector, double scalar) {
        List<Double> result = new ArrayList<>(vector.size());
        for (double value : vector) {
            result.add(value * scalar);
        }
        
        return result;
    }

    public static double magnitude(List<Double> vector) {
        double sumOfSquares = 0.0;
        for (double value : vector) {
            sumOfSquares += value * value;
        }
        
        return Math.sqrt(sumOfSquares);
    }

    public static double euclideanDistance(List<Double> vec1, List<Double> vec2) {
        if (vec1.size() != vec2.size()) {
            throw new IllegalArgumentException("Vectors must be of equal length");
        }

        double sumOfSquaredDifferences = 0.0;
        for (int i = 0; i < vec1.size(); i++) {
            double diff = vec1.get(i) - vec2.get(i);
            sumOfSquaredDifferences += diff * diff;
        }
        
        return Math.sqrt(sumOfSquaredDifferences);
    }

    public static List<Double> average(List<List<Double>> vectors) {
        if (vectors.isEmpty()) {
            throw new IllegalArgumentException("Cannot compute average of empty vector list");
        }

        int dimension = vectors.get(0).size();
        double[] sum = new double[dimension];
        
        for (List<Double> vector : vectors) {
            if (vector.size() != dimension) {
                throw new IllegalArgumentException("All vectors must have the same dimension");
            }
            
            for (int i = 0; i < dimension; i++) {
                sum[i] += vector.get(i);
            }
        }

        List<Double> average = new ArrayList<>(dimension);
        for (int i = 0; i < dimension; i++) {
            average.add(sum[i] / vectors.size());
        }
        
        return average;
    }

    public static List<Double> parseVector(String vectorString) {
        String cleaned = vectorString.replaceAll("[\\[\\]\\s]", "");
        String[] values = cleaned.split(",");
        List<Double> vector = new ArrayList<>(values.length);
        
        for (String value : values) {
            vector.add(Double.parseDouble(value));
        }
        
        return vector;
    }

    public static String vectorToString(List<Double> vector) {
        return Arrays.toString(vector.toArray(new Double[0]));
    }
}
