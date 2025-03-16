import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemMessage = {
  role: "system",
  content:
    "Bạn là một AI assistant hữu ích và chuyên nghiệp. Hãy trả lời ngắn gọn, chính xác và không lặp lại câu hỏi của người dùng. Tránh giới thiệu bản thân trừ khi được hỏi trực tiếp.",
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Thêm system message vào đầu mảng tin nhắn
  const messagesWithSystem = [systemMessage, ...messages];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messagesWithSystem,
    temperature: 0.7,
    max_tokens: 200,
  });

  return Response.json({
    content: response.choices[0].message.content,
  });
}
