import { SearchFormContainer } from "./styles";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext);

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransaction(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        placeholder="Busque por transações"
        type="text"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
