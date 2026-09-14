import type {StructureBuilder} from 'sanity/structure'
import {GiWalk, GiMountains, GiLightBulb, GiStarKey, GiChecklist} from 'react-icons/gi'
import {FaImage, FaMoneyBillWave, FaNewspaper} from 'react-icons/fa'
import {MdFitnessCenter, MdBackpack, MdGroups, MdInfo} from 'react-icons/md'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Nội dung quản trị')
    .items([
      S.listItem()
        .title('Tour Hàng Ngày')
        .icon(GiWalk)
        .child(S.documentTypeList('tourDaily').title('Danh sách Tour Hàng Ngày')),

      S.listItem()
        .title('Tour Tây Nguyên')
        .icon(GiMountains)
        .child(S.documentTypeList('tourCentral').title('Danh sách Tour Tây Nguyên')),

      S.divider(),

      // Custom Good To Know structured by 4 fixed blocks/folders
      S.listItem()
        .title('Thông Tin Cần Biết')
        .icon(GiLightBulb)
        .child(
          S.list()
            .title('Danh Mục Thông Tin Cần Biết')
            .items([
              S.listItem()
                .title('Mức độ vận động')
                .icon(MdFitnessCenter)
                .child(
                  S.documentList()
                    .title('Mức độ vận động')
                    .filter('_type == "tourGoodToKnow" && category == "activity_level"')
                    .initialValueTemplates([
                      S.initialValueTemplateItem('tourGoodToKnow-activity_level'),
                    ]),
                ),

              S.listItem()
                .title('Hành trang')
                .icon(MdBackpack)
                .child(
                  S.documentList()
                    .title('Hành trang')
                    .filter('_type == "tourGoodToKnow" && category == "what_to_pack"')
                    .initialValueTemplates([
                      S.initialValueTemplateItem('tourGoodToKnow-what_to_pack'),
                    ]),
                ),

              S.listItem()
                .title('Quy mô nhóm')
                .icon(MdGroups)
                .child(
                  S.documentList()
                    .title('Quy mô nhóm')
                    .filter('_type == "tourGoodToKnow" && category == "group_size"')
                    .initialValueTemplates([
                      S.initialValueTemplateItem('tourGoodToKnow-group_size'),
                    ]),
                ),

              S.listItem()
                .title('Lưu ý khác')
                .icon(MdInfo)
                .child(
                  S.documentList()
                    .title('Lưu ý khác')
                    .filter('_type == "tourGoodToKnow" && category == "other_notes"')
                    .initialValueTemplates([
                      S.initialValueTemplateItem('tourGoodToKnow-other_notes'),
                    ]),
                ),
            ]),
        ),

      S.listItem()
        .title('Các Điểm Nổi Bật')
        .icon(GiStarKey)
        .child(S.documentTypeList('tourHighlights').title('Danh sách Điểm Nổi Bật')),

      S.listItem()
        .title('Các Hạng Mục Bao Gồm')
        .icon(GiChecklist)
        .child(S.documentTypeList('tourIncludes').title('Danh sách Hạng Mục Bao Gồm')),

      S.divider(),

      S.listItem()
        .title('Hình Ảnh Hero')
        .icon(FaImage)
        .child(S.documentTypeList('heroImage').title('Danh sách Hình Ảnh Hero')),

      S.listItem()
        .title('Tỉ Giá Quy Đổi')
        .icon(FaMoneyBillWave)
        .child(S.documentTypeList('exchangeRates').title('Tỉ Giá Quy Đổi')),

      S.listItem()
        .title('Bài Viết Blog')
        .icon(FaNewspaper)
        .child(S.documentTypeList('blogPost').title('Danh sách Bài Viết Blog')),
    ])
