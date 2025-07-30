import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { text, voiceId, doctorId } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const murfApiKey = process.env.MURF_API_KEY;

    if (!murfApiKey) {
      console.error("Murf API key is not configured");
      return NextResponse.json({
        success: false,
        useBrowserTTS: true,
        text: text,
        error: "Murf API key is missing"
      });
    }

    try {

      const doctorIdToVoiceMapping: Record<number, string> = {
        1: "en-US-ken",
        2: "en-US-charles",
        3: "en-US-carter",
        4: "en-US-emily",
        5: "en-US-naomi",
        6: "fr-FR-adélie",
        7: "it-IT-greta",
        8: "nl-NL-dirk",
        9: "en-UK-peter"
      };


      const voiceIdMapping: Record<string, string> = {
        "ken": "en-US-ken",
        "charles": "en-US-charles",
        "carter": "en-US-carter",
        "emily": "en-US-emily",
        "naomi": "en-US-naomi",
        "adélie": "fr-FR-adélie",
        "greta": "it-IT-greta",
        "dirk": "nl-NL-dirk",
        "peter": "en-UK-peter"
      };


      let murfVoiceId = "en-UK-peter"; 

      if (doctorId && doctorIdToVoiceMapping[doctorId]) {
        murfVoiceId = doctorIdToVoiceMapping[doctorId];
        console.log(`Using voice mapping for doctorId ${doctorId}: ${murfVoiceId}`);
      } else if (voiceId && voiceIdMapping[voiceId]) {
        murfVoiceId = voiceIdMapping[voiceId];
        console.log(`Using voice mapping for voiceId ${voiceId}: ${murfVoiceId}`);
      }

      console.log(`Calling Murf AI API with voice: ${murfVoiceId}, text length: ${text.length} chars`);


      const requestData = {
        text: text,
        voiceId: murfVoiceId,
        format: "mp3",
        speed: 1.0,
        pitch: 0,
        sampleRate: 44100
      };

      console.log("Murf API request data:", JSON.stringify(requestData));

      const response = await axios.post(
        "https://api.murf.ai/v1/speech/generate", 
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "api-key": murfApiKey 
          },
          timeout: 15000
        }
      );

      console.log(`Murf API response status: ${response.status}`);


      if (response.data && response.data.audioFile) {
        console.log(`Murf AI API returned audio URL: ${response.data.audioFile.substring(0, 50)}...`);


        const audioResponse = await axios.get(response.data.audioFile, {
          responseType: 'arraybuffer',
          timeout: 10000
        });

        console.log(`Successfully fetched audio data from Murf AI, size: ${audioResponse.data.byteLength} bytes`);


        return new NextResponse(audioResponse.data, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "attachment; filename=speech.mp3"
          }
        });
      } else {
        console.error("Invalid Murf API response:", JSON.stringify(response.data));
        return NextResponse.json({
          success: false,
          useBrowserTTS: true,
          text: text,
          error: "Invalid Murf API response - no audioFile URL returned",
          responseData: response.data
        });
      }
    } catch (murfError: any) {
      console.error("Error with Murf API:", murfError.message);
      console.error("Error details:", murfError.response?.data || "No response data");

          
      const errorDetails = {
        message: murfError.message,
        status: murfError.response?.status,
        statusText: murfError.response?.statusText,
        data: murfError.response?.data,
        headers: murfError.response?.headers
      };

      console.error("Full error details:", JSON.stringify(errorDetails));

      return NextResponse.json({
        success: false,
        useBrowserTTS: true,
        text: text,
        error: murfError.message,
        errorDetails: errorDetails
      });
    }
  } catch (error: any) {
    console.error("Error in TTS API:", error.message);
    return NextResponse.json({ error: "Failed to generate speech", details: error.message }, { status: 500 });
  }
} 