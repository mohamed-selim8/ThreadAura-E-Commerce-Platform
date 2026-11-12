function Subscribe() {
  function handelForm(e) {
    e.preventDefault();
  }
  return (
    <section className="my-10 ">
      <div className="text-center">
        <p className="text-2xl font-medium text-gray-800">
          Subscribe now & get 20% off
        </p>
        <p className="mt-3 text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          assumenda, similique iusto accusantium praesentium nisi?
        </p>
        <form
          action=""
          onSubmit={handelForm}
          className="w-75 md:w-1/2 flex items-center md:gap-3 mx-auto my-6 border border-gray-300 shadow  md:pl-3"
        >
          <input
            type="email"
            placeholder="enter your email"
            className="capitalize p-1 w-full sm:flex-1 outline-none"
            name="email"
          />
          <input
            className="cursor-pointer p-1 bg-black text-white text-xs md:px-10 py-4 uppercase"
            type="submit"
            value={"subscribe"}
          />
        </form>
      </div>
    </section>
  );
}

export default Subscribe;
