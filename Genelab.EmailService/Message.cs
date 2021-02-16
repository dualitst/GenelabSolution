using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Genelab.EmailService
{
    public class Message
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public MimeEntity Content { get; set; }
        public Message(IEnumerable<string> to, string subject, string content)
        {
            To = new List<MailboxAddress>();
            To.AddRange(to.Select(x => new MailboxAddress(x)));

            BodyBuilder bodyBuilder = new BodyBuilder();

            bodyBuilder.HtmlBody = "";

            bodyBuilder.TextBody = "";

            Subject = subject;
            Content = bodyBuilder.ToMessageBody();
        }
    }


}
