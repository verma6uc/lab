package ai.yuvi.util;

import java.util.ArrayList;
import java.util.List;

/**
 * Utility class for handling embeddings (float arrays) for storage in Postgres vector columns.
 */
public class VectorUtil {

    /**
     * Converts a float array into a Postgres vector string representation, e.g.:
     * [0.1,0.2,0.3]
     * 
     * @param vector The float array
     * @return A string suitable for inserting into a VECTOR column
     */
    public static String floatArrayToVectorString(float[] vector) {
        if (vector == null || vector.length == 0) {
            return "[]";
        }
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < vector.length; i++) {
            sb.append(vector[i]);
            if (i < vector.length - 1) {
                sb.append(",");
            }
        }
        sb.append("]");
        return sb.toString();
    }

    /**
     * Parses a Postgres vector string (e.g., "[0.1,0.2,0.3]") back into a float array.
     * 
     * @param vectorStr The string representation from the database
     * @return float array parsed from the string
     */
    public static float[] vectorStringToFloatArray(String vectorStr) {
        if (vectorStr == null || vectorStr.trim().isEmpty()) {
            return new float[0];
        }
        String trimmed = vectorStr.trim();
        // Expecting a format like: [0.1,0.2,0.3]
        if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
            trimmed = trimmed.substring(1, trimmed.length() - 1); // remove brackets
        } else {
            // Invalid format
            return new float[0];
        }

        if (trimmed.isEmpty()) {
            return new float[0];
        }

        String[] parts = trimmed.split(",");
        List<Float> values = new ArrayList<>();
        for (String part : parts) {
            part = part.trim();
            if (!part.isEmpty()) {
                values.add(Float.parseFloat(part));
            }
        }
        float[] result = new float[values.size()];
        for (int i = 0; i < values.size(); i++) {
            result[i] = values.get(i);
        }
        return result;
    }
}
