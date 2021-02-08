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

        Task<List<SelectFacturaList_Result>> SelectFacturaList();

        Task<List<SelectMuestraList_Result>> SelectMuestraList();

        Task<List<SelectMyList_Result>> SelectMyList(string usuario);
        Task<List<SelectMyBillList_Result>> SelectMyBillList(string usuario);

        
    }


}
