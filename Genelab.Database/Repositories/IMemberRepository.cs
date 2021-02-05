using Genelab.Database.ComplexTypes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Genelab.Database.Repositories
{
    public interface IMemberRepository
    {
        Task<List<SelectResultList_Result>> SelectResultList();

        Task<List<SelectPayList_Result>> SelectPayList();

        Task<List<SelectSitioList_Result>> SelectSitioList();

        Task<List<SelectDomicilioList_Result>> SelectDomicilioList();


    }
}
