"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtpCode = void 0;
const twilio_1 = __importDefault(require("twilio"));
const client = (0, twilio_1.default)(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_ACCOUNT_TOKEN
);
const sendOtpCode = (phoneNumber) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield client.verify.v2
        .services(process.env.TWILIO_SERVICE_ID || "")
        .verifications.create({
          to: `+${phoneNumber}`,
          channel: "sms",
        });
      return response;
    } catch (error) {
      throw error;
    }
  });
exports.sendOtpCode = sendOtpCode;
const verifyOtp = (phoneNumber, code) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield client.verify.v2
        .services(process.env.TWILIO_SERVICE_ID || "")
        .verificationChecks.create({
          to: `+${phoneNumber}`,
          code,
        });
      return response;
    } catch (error) {
      console.log("errtrigger", error);
      throw error;
    }
  });
exports.verifyOtp = verifyOtp;
