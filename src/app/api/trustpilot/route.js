import puppeteer from "puppeteer";

// Export the default handler function for the API route
export async function GET(request) {
  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto("https://upconvert.de/debsc13/", {
      waitUntil: "networkidle2",
    });

    // Wait for the iframe element to be available in the DOM
    await page.waitForSelector("#tp-container iframe");
    const iframeElement = await page.$("#tp-container iframe");

    // Throw an error if the iframe is not found
    if (!iframeElement) {
      throw new Error("Iframe not found");
    }

    // Get the content frame of the iframe
    const iframe = await iframeElement.contentFrame();

    // Throw an error if the iframe content frame is not available
    if (!iframe) {
      throw new Error("Could not get iframe content frame");
    }

    // Wait for the desired element inside the iframe to be loaded and visible
    await iframe.waitForSelector("#translations-main", { visible: true });

    // Extract the inner HTML content of the desired element
    const ratingString = await iframe.$eval(
      "#translations-main",
      (el) => el.innerHTML
    );

    // Use a regular expression to extract the rating from the string
    const ratingMatch = ratingString.match(/^\d+\.\d+/);
    const rating = ratingMatch ? ratingMatch[0] : null;

    await browser.close();

    // Send a JSON response with the extracted rating
    return Response.json({ rating });

    // Close the browser instance
  } catch (error) {
    // Send a JSON response with an error message in case of an exception
    return Response.json({ error });
  }
}
