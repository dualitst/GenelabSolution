using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Genelab.EmailService
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;
        public EmailSender(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }
        public void SendEmail(Message message, string mensajes)
        {
            var emailMessage = CreateEmailMessage(message,  mensajes);
            Send(emailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message,string mensajes)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfig.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;

            // Get mail template
            string FullFormatPath = Path.Combine(Environment.CurrentDirectory, "Email", "");
            string[] ImgPaths = Directory.GetFiles(Path.Combine(FullFormatPath, "Images"));

            string HtmlFormat = string.Empty;

            var builder = new BodyBuilder();

            using (FileStream fs = new FileStream(Path.Combine(FullFormatPath, "index.html"), FileMode.Open))
            {
                using (StreamReader sr = new StreamReader(fs, Encoding.Default))
                {
                    HtmlFormat = sr.ReadToEnd();
                }
            }

            // Add pictures to embedded resources and replace links to pictures in the message
            foreach (string imgpath in ImgPaths)
            {
                var image = builder.LinkedResources.Add(imgpath);
                image.ContentId = MimeUtils.GenerateMessageId();
                HtmlFormat = HtmlFormat.Replace(Path.GetFileName(imgpath), string.Format("cid:{0}", image.ContentId));
            }

            HtmlFormat = HtmlFormat.Replace("#mensaje#", mensajes);

            builder.HtmlBody = HtmlFormat;

            emailMessage.Body = builder.ToMessageBody();

            //var bodyBuilder = new BodyBuilder();
            //bodyBuilder.HtmlBody = "<b>This is some html text</b>";
            //string htmlFilePath = "/Email/index.html";
            //bodyBuilder.HtmlBody = File.ReadAllText(htmlFilePath);
            //emailMessage.Body = bodyBuilder.ToMessageBody();

            return emailMessage;
        }
        private void Send(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.UserName, _emailConfig.Password);
                    client.Send(mailMessage);
                }
                catch
                {
                    //log an error message or throw an exception or both.
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }

    public interface IEmailSender
    {
        void SendEmail(Message message, string mensajes);
    }
}
