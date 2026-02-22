'use client'

import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import Media from '@/components/Application/Admin/Media'
import UploadMedia from '@/components/Application/Admin/UploadMedia'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const breadcrumbData = [
    { href: '/admin', label: 'Home' },
    { href: '', label: 'Slider' },
]

const SliderPage = () => {

    const queryClient = useQueryClient()

    const fetchSlider = async (page) => {
        const { data } = await axios.get(`/api/slider/get?page=${page}&limit=10`)
        return data
    }

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        status
    } = useInfiniteQuery({
        queryKey: ['slider-data'],
        queryFn: async ({ pageParam }) => await fetchSlider(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length
            return lastPage.hasMore ? nextPage : undefined
        },
    })
    const handleDeleteSlider = async (id) => {
  const confirmDelete = confirm("Remove from slider?");
  if (!confirmDelete) return;

  try {
    await axios.patch("/api/media/set-slider", {
      id,
      isSlider: false
    });

    queryClient.invalidateQueries(["slider-data"]);
  } catch (error) {
    console.error(error);
  }
};

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />

            <Card className="py-0 rounded shadow-sm">
                <CardHeader className="pt-3 px-3 border-b">
                    <div className='flex justify-between items-center'>
                        <h4 className='font-semibold text-xl uppercase'>
                            Slider
                        </h4>

                        <UploadMedia
                            isMultiple={true}
                            queryClient={queryClient}
                            uploadType="slider"
                        />
                    </div>
                </CardHeader>

                <CardContent className="pb-5">

  {status === 'pending'
    ? <div>Loading...</div>
    : status === 'error'
      ? <div className='text-red-500 text-sm'>{error.message}</div>
      :
      <>
        {data?.pages
          ?.flatMap(page => page?.data?.data ?? [])
          .length === 0 &&
          <div>Data not found.</div>
        }

        {/* 🔥 REPLACE GRID HERE */}
        <div className='grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 mb-5'>
          {
            data?.pages?.map((page, index) => (
              <React.Fragment key={index}>
                {page?.data?.data?.map((slider) => (
                  <div
                    key={slider._id}
                    className='border rounded overflow-hidden relative group'
                  >
                    <img
                      src={slider.secure_url}
                      className='w-full h-[150px] object-cover'
                    />

                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition"
                      onClick={() => handleDeleteSlider(slider._id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </React.Fragment>
            ))
          }
        </div>
      </>
  }
  {hasNextPage &&
                          <ButtonLoading type="button" className="cursor-pointer" loading={isFetching} onClick={() => fetchNextPage()} text="Load More" />
                      }

</CardContent>
            </Card>
        </div>
    )
}

export default SliderPage