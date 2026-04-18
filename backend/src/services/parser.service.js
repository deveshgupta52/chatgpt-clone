import {PDFParse} from 'pdf-parse';
import mammoth from 'mammoth';
import { parse } from 'csv-parse/sync';
import Tesseract from 'tesseract.js';

/**
 * Extracts text from a file buffer based on its mimetype.
 * @param {Buffer} buffer - The file buffer.
 * @param {string} mimetype - The file mimetype.
 * @returns {Promise<string>} - The extracted text.
 */
export const extractText = async (buffer, mimetype) => {
    try {
        if (mimetype === 'application/pdf') {
            const parser = new PDFParse({ data: buffer });
            const result = await parser.getText();
            return result.text;
        }

        if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || mimetype === 'application/msword') {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        }

        if (mimetype === 'text/csv') {
            const records = parse(buffer, { columns: true, skip_empty_lines: true });
            return JSON.stringify(records, null, 2);
        }

        if (mimetype.startsWith('image/')) {
            const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
            return text;
        }

        if (mimetype.startsWith('text/')) {
            return buffer.toString('utf8');
        }

        return '';
    } catch (error) {
        console.error(`Error extracting text from ${mimetype}:`, error);
        return '';
    }
};
