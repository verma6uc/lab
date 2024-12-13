package ai.yuvi.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Utility class for servlet-related operations such as parameter retrieval and response writing.
 */
public class HttpUtil {

    /**
     * Retrieve a required parameter from the request, throwing an IllegalArgumentException if missing.
     *
     * @param request HttpServletRequest
     * @param name    Parameter name
     * @return Parameter value as a String
     */
    public static String getRequiredParameter(HttpServletRequest request, String name) {
        String val = request.getParameter(name);
        if (val == null || val.trim().isEmpty()) {
            throw new IllegalArgumentException("Missing required parameter: " + name);
        }
        return val.trim();
    }

    /**
     * Retrieve an optional parameter; if not present, return default value.
     *
     * @param request       HttpServletRequest
     * @param name          Parameter name
     * @param defaultValue  Default value if parameter not found
     * @return Parameter value or defaultValue
     */
    public static String getOptionalParameter(HttpServletRequest request, String name, String defaultValue) {
        String val = request.getParameter(name);
        return (val != null && !val.trim().isEmpty()) ? val.trim() : defaultValue;
    }

    /**
     * Retrieve a parameter as a long, throwing an IllegalArgumentException if not convertible.
     *
     * @param request HttpServletRequest
     * @param name    Parameter name
     * @return Parsed long value
     */
    public static long getParameterAsLong(HttpServletRequest request, String name) {
        String val = getRequiredParameter(request, name);
        try {
            return Long.parseLong(val);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Parameter " + name + " must be a valid long");
        }
    }

    /**
     * Write a plain text response to the client.
     *
     * @param response HttpServletResponse
     * @param message  The message to write
     * @throws IOException if the write fails
     */
    public static void writePlainTextResponse(HttpServletResponse response, String message) throws IOException {
        response.setContentType("text/plain; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(message);
    }

    /**
     * Write a JSON response (if desired). Even though DB doesn’t use JSON, it’s common to return JSON responses.
     *
     * @param response HttpServletResponse
     * @param json     The JSON string to write
     * @throws IOException if the write fails
     */
    public static void writeJsonResponse(HttpServletResponse response, String json) throws IOException {
        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(json);
    }

}
